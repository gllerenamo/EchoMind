import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { Patient } from './patient.entity';
import { Doctor } from './doctor.entity';
import { Consultation } from './consultation.entity';
import { Referral } from './referral.entity';

@Entity('clinical_cases')
export class ClinicalCase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'simple-array' })
  symptoms: string[];

  @Column({ type: 'text', nullable: true })
  diagnosis?: string;

  @Column({ type: 'text', nullable: true })
  treatment?: string;

  @Column({ 
    type: 'enum', 
    enum: ['active', 'resolved', 'pending'],
    default: 'pending'
  })
  status: 'active' | 'resolved' | 'pending';

  @Column({ 
    type: 'enum', 
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  })
  priority: 'low' | 'medium' | 'high' | 'urgent';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Patient, patient => patient.clinicalCases)
  patient: Patient;

  @Column()
  patientId: string;

  @ManyToMany(() => Doctor, doctor => doctor.assignedCases)
  @JoinTable({
    name: 'doctor_clinical_cases',
    joinColumn: { name: 'clinicalCaseId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'doctorId', referencedColumnName: 'id' },
  })
  assignedDoctors: Doctor[];

  @OneToMany(() => Consultation, consultation => consultation.clinicalCase)
  consultations: Consultation[];

  @OneToMany(() => Referral, referral => referral.clinicalCase)
referrals: Referral[];
} 