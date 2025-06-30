import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { ClinicalCase } from './clinical-case.entity';
import { Doctor } from './doctor.entity';
import { Message } from './message.entity';

@Entity('consultations')
export class Consultation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ 
    type: 'enum', 
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  })
  status: 'pending' | 'accepted' | 'rejected' | 'completed';

  @Column({ type: 'text', nullable: true })
  response?: string;

  @Column({ type: 'timestamp', nullable: true })
  completedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => ClinicalCase, clinicalCase => clinicalCase.consultations)
  clinicalCase: ClinicalCase;

  @Column()
  clinicalCaseId: string;

  @ManyToOne(() => Doctor, doctor => doctor.requestedConsultations)
  requestingDoctor: Doctor;

  @Column()
  requestingDoctorId: string;

  @ManyToOne(() => Doctor, doctor => doctor.receivedConsultations)
  requestedDoctor: Doctor;

  @Column()
  requestedDoctorId: string;

  @OneToMany(() => Message, message => message.consultation)
  messages: Message[];
} 