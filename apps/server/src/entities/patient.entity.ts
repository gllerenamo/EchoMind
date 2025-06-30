import { Entity, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { ClinicalCase } from './clinical-case.entity';

@Entity('patients')
export class Patient extends User {
  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ length: 20 })
  phoneNumber: string;

  @Column({ type: 'json', nullable: true })
  emergencyContact?: {
    name: string;
    phoneNumber: string;
    relationship: string;
  };

  @Column({ type: 'text', nullable: true })
  medicalHistory?: string;

  @Column({ type: 'simple-array', nullable: true })
  allergies?: string[];

  @Column({ length: 5, nullable: true })
  bloodType?: string;

  // Relations
  @OneToMany(() => ClinicalCase, clinicalCase => clinicalCase.patient)
  clinicalCases: ClinicalCase[];
} 