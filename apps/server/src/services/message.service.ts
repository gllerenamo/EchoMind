import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../entities/message.entity';
import { ClinicalCase } from '../entities/clinical-case.entity';
import { Patient } from '../entities/patient.entity';
import { Doctor } from '../entities/doctor.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(ClinicalCase)
    private clinicalCaseRepository: Repository<ClinicalCase>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async sendMessage(caseId: string, user: any, content: string) {
    const clinicalCase = await this.clinicalCaseRepository.findOne({
      where: { id: caseId },
      relations: ['patient', 'assignedDoctors'],
    });
    if (!clinicalCase) throw new NotFoundException('Caso clínico no encontrado');
    // Solo participantes pueden enviar mensajes
    const isParticipant =
      (user.role === 'patient' && clinicalCase.patientId === user.id) ||
      (user.role === 'doctor' && clinicalCase.assignedDoctors.some((d) => d.id === user.id));
    if (!isParticipant) throw new ForbiddenException('No tienes acceso a este chat');
    const message = this.messageRepository.create({
      consultationId: undefined,
      senderId: user.id,
      senderType: user.role,
      content,
      consultation: undefined,
      clinicalCaseId: caseId,
    });
    return this.messageRepository.save(message);
  }

  async getMessages(caseId: string, user: any) {
    const clinicalCase = await this.clinicalCaseRepository.findOne({
      where: { id: caseId },
      relations: ['patient', 'assignedDoctors'],
    });
    if (!clinicalCase) throw new NotFoundException('Caso clínico no encontrado');
    const isParticipant =
      (user.role === 'patient' && clinicalCase.patientId === user.id) ||
      (user.role === 'doctor' && clinicalCase.assignedDoctors.some((d) => d.id === user.id));
    if (!isParticipant) throw new ForbiddenException('No tienes acceso a este chat');
    return this.messageRepository.find({
      where: { clinicalCaseId: caseId },
      order: { createdAt: 'ASC' },
    });
  }
} 