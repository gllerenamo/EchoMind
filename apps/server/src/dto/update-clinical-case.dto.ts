import { PartialType } from '@nestjs/mapped-types';
import { CreateClinicalCaseDto } from './create-clinical-case.dto';

export class UpdateClinicalCaseDto extends PartialType(CreateClinicalCaseDto) {} 