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

  async getUserChatHistory(user: any) {
    // Obtener todos los casos en los que el usuario participa
    let cases: ClinicalCase[] = [];
    if (user.role === 'patient') {
      cases = await this.clinicalCaseRepository.find({ where: { patientId: user.id } });
    } else if (user.role === 'doctor') {
      cases = await this.clinicalCaseRepository
        .createQueryBuilder('case')
        .leftJoin('case.assignedDoctors', 'doctor')
        .where('doctor.id = :id', { id: user.id })
        .getMany();
    }
    if (cases.length === 0) return [];
    // Para cada caso, obtener el último mensaje
    const result = await Promise.all(
      cases.map(async (c) => {
        const lastMsg = await this.messageRepository.findOne({
          where: { clinicalCaseId: c.id },
          order: { createdAt: 'DESC' },
        });
        return {
          case: c,
          lastMessage: lastMsg,
        };
      })
    );
    // Ordenar por fecha del último mensaje (más reciente primero)
    return result.sort((a, b) => {
      const dateA = a.lastMessage?.createdAt ? new Date(a.lastMessage.createdAt).getTime() : 0;
      const dateB = b.lastMessage?.createdAt ? new Date(b.lastMessage.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  }
} 