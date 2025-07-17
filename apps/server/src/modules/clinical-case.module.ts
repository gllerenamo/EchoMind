import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicalCaseController } from '../controllers/clinical-case.controller';
import { ClinicalCaseService } from '../services/clinical-case.service';
import { ClinicalCase, Patient, Doctor } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([ClinicalCase, Patient, Doctor])],
  controllers: [ClinicalCaseController],
  providers: [ClinicalCaseService],
  exports: [ClinicalCaseService],
})
export class ClinicalCaseModule {} 