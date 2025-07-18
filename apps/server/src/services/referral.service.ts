import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Referral } from "src/entities/referral.entity";
import { Repository } from "typeorm";
import { ClinicalCase } from "src/entities/clinical-case.entity";
import { Doctor } from "src/entities/doctor.entity";
import { CreateReferralDto } from "src/dto/create-referral.dto";
import { In } from 'typeorm';

@Injectable()
export class ReferralService {
  constructor(
    @InjectRepository(Referral)
    private referralRepo: Repository<Referral>,
    @InjectRepository(ClinicalCase)
    private clinicalCaseRepo: Repository<ClinicalCase>,
    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
  ) {}

  async createReferral(fromDoctorId: number, dto: CreateReferralDto) {
    const clinicalCase = await this.clinicalCaseRepo.findOneBy({ id: dto.clinicalCaseId.toString() });
    const toDoctor = await this.doctorRepo.findOneBy({ id: dto.toDoctorId.toString() });
    const fromDoctor = await this.doctorRepo.findOneBy({ id: fromDoctorId.toString() });

    if (!clinicalCase || !toDoctor || !fromDoctor ) return

    const referral = this.referralRepo.create({
      clinicalCase,
      fromDoctor,
      toDoctor,
      reason: dto.reason,
    });

    return this.referralRepo.save(referral);
  }

  async getReferralsByCase(clinicalCaseId: number) {
    return this.referralRepo.find({
      where: { clinicalCase: { id: clinicalCaseId.toString() } },
      relations: ['fromDoctor', 'toDoctor'],
      order: { createdAt: 'DESC' },
    });
  }

  async getReferralsByUser(user: any) {
    if (user.role === 'doctor') {
      return this.referralRepo.find({
        where: [
          { fromDoctor: { id: user.id } },
          { toDoctor: { id: user.id } },
        ],
        relations: ['fromDoctor', 'toDoctor', 'clinicalCase'],
        order: { createdAt: 'DESC' },
      });
    }
    if (user.role === 'patient') {
      // Buscar referrals de todos los casos del paciente
      const cases = await this.clinicalCaseRepo.find({ where: { patientId: user.id } });
      const caseIds = cases.map(c => c.id);
      if (caseIds.length === 0) return [];
      return this.referralRepo.find({
        where: { clinicalCase: { id: In(caseIds) } },
        relations: ['fromDoctor', 'toDoctor', 'clinicalCase'],
        order: { createdAt: 'DESC' },
      });
    }
    return [];
  }
}
