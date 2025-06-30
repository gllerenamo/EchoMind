import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { ClinicalCase } from './clinical-case.entity';
import { Consultation } from './consultation.entity';

@Entity('doctors')
export class Doctor extends User {
  @Column({ length: 50, unique: true })
  licenseNumber: string;

  @Column({ length: 100 })
  specialty: string;

  @Column({ length: 255, nullable: true })
  hospital?: string;

  @Column({ length: 20 })
  phoneNumber: string;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  consultationFee?: number;

  // Relations
  @ManyToMany(() => ClinicalCase)
  @JoinTable({
    name: 'doctor_clinical_cases',
    joinColumn: { name: 'doctorId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'clinicalCaseId', referencedColumnName: 'id' },
  })
  assignedCases: ClinicalCase[];

  @OneToMany(() => Consultation, consultation => consultation.requestingDoctor)
  requestedConsultations: Consultation[];

  @OneToMany(() => Consultation, consultation => consultation.requestedDoctor)
  receivedConsultations: Consultation[];
} 