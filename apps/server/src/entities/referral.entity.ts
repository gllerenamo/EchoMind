import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Doctor } from './doctor.entity';
import { ClinicalCase } from './clinical-case.entity';

@Entity()
export class Referral {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Doctor)
  fromDoctor: Doctor;

  @ManyToOne(() => Doctor)
  toDoctor: Doctor;

  @ManyToOne(() => ClinicalCase, clinicalCase => clinicalCase.referrals)
  clinicalCase: ClinicalCase;

  @Column()
  reason: string;

  @CreateDateColumn()
  createdAt: Date;
}
