import { IsString, IsEmail, IsOptional, IsNumber, MinLength, IsPositive } from 'class-validator';

export class RegisterDoctorDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(5)
  licenseNumber: string;

  @IsString()
  @MinLength(2)
  specialty: string;

  @IsOptional()
  @IsString()
  hospital?: string;

  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  consultationFee?: number;
} 