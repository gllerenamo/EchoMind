import { IsString, IsEmail, IsDateString, IsOptional, IsObject, ValidateNested, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

class EmergencyContactDto {
  @IsString()
  name: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  relationship: string;
}

export class RegisterPatientDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsDateString()
  dateOfBirth: string;

  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => EmergencyContactDto)
  emergencyContact?: EmergencyContactDto;
} 