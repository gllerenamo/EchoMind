import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClinicalCase } from '../entities/clinical-case.entity';
import { Patient } from '../entities/patient.entity';
import { Doctor } from '../entities/doctor.entity';
import { CreateClinicalCaseDto, UpdateClinicalCaseDto } from '../dto';

@Injectable()
export class ClinicalCaseService {
  constructor(
    @InjectRepository(ClinicalCase)
    private clinicalCaseRepository: Repository<ClinicalCase>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async create(patientId: string, dto: CreateClinicalCaseDto) {
    const patient = await this.patientRepository.findOne({ where: { id: patientId } });
    if (!patient) throw new ForbiddenException('Solo los pacientes pueden crear casos clínicos');
    const clinicalCase = this.clinicalCaseRepository.create({
      ...dto,
      patient,
      patientId,
      status: 'pending',
      priority: dto.priority || 'medium',
    });
    return this.clinicalCaseRepository.save(clinicalCase);
  }

  async findAllForUser(user: any) {
    if (user.role === 'admin') {
      // Solo casos pendientes, si lo prefieres
      return this.clinicalCaseRepository.find({
        where: { status: 'pending' },
        relations: ['assignedDoctors', 'patient'],
        order: { createdAt: 'DESC' }
      });
    } else if (user.role === 'patient') {
      return this.clinicalCaseRepository.find({ where: { patientId: user.id }, relations: ['assignedDoctors'] });
    } else if (user.role === 'doctor') {
      return this.clinicalCaseRepository
        .createQueryBuilder('case')
        .leftJoinAndSelect('case.assignedDoctors', 'doctor')
        .where('doctor.id = :id', { id: user.id })
        .getMany();
    }
    return [];
  }

  async findOne(id: string, user: any) {
    const clinicalCase = await this.clinicalCaseRepository.findOne({
      where: { id },
      relations: ['patient', 'assignedDoctors'],
    });
    if (!clinicalCase) throw new NotFoundException('Caso clínico no encontrado');
    if (
      user.role === 'patient' && clinicalCase.patientId !== user.id && user.role !== 'admin' ||
      user.role === 'doctor' && !clinicalCase.assignedDoctors.some((d) => d.id === user.id)
    ) {
      throw new ForbiddenException('No tienes acceso a este caso clínico');
    }
    return clinicalCase;
  }

  async assignDoctor(caseId: string, doctorId: string) {
    const clinicalCase = await this.clinicalCaseRepository.findOne({ where: { id: caseId }, relations: ['assignedDoctors'] });
    const doctor = await this.doctorRepository.findOne({ where: { id: doctorId } });
    if (!clinicalCase || !doctor) throw new NotFoundException('Caso o médico no encontrado');
    clinicalCase.assignedDoctors.push(doctor);
    return this.clinicalCaseRepository.save(clinicalCase);
  }

  async update(caseId: string, dto: UpdateClinicalCaseDto, user: any) {
    const clinicalCase = await this.clinicalCaseRepository.findOne({ where: { id: caseId }, relations: ['assignedDoctors'] });
    if (!clinicalCase) throw new NotFoundException('Caso clínico no encontrado');

    // Si es admin, puede editar todo
    if (user.role === 'admin') {
      Object.assign(clinicalCase, dto);
      return this.clinicalCaseRepository.save(clinicalCase);
    }

    // Si es paciente, solo puede editar sus propios casos y no puede editar diagnóstico/tratamiento
    if (user.role === 'patient') {
      if (clinicalCase.patientId !== user.id) {
        throw new ForbiddenException('No tienes permiso para actualizar este caso');
      }
      // Eliminar diagnosis y treatment del dto si existen
      const { diagnosis, treatment, ...rest } = dto;
      Object.assign(clinicalCase, rest);
      return this.clinicalCaseRepository.save(clinicalCase);
    }

    // Si es médico asignado, solo puede editar diagnóstico y tratamiento
    if (user.role === 'doctor' && clinicalCase.assignedDoctors.some((d) => d.id === user.id)) {
      const allowedFields: Partial<UpdateClinicalCaseDto> = {};
      if (dto.diagnosis !== undefined) allowedFields.diagnosis = dto.diagnosis;
      if (dto.treatment !== undefined) allowedFields.treatment = dto.treatment;
      Object.assign(clinicalCase, allowedFields);
      return this.clinicalCaseRepository.save(clinicalCase);
    }

    throw new ForbiddenException('No tienes permiso para actualizar este caso');
  }
} 