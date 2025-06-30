import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Patient } from '../entities/patient.entity';
import { Doctor } from '../entities/doctor.entity';
import { RegisterPatientDto, RegisterDoctorDto, LoginDto } from '../dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async registerPatient(registerDto: RegisterPatientDto) {
    // Verificar si el email ya existe
    const existingUser = await this.patientRepository.findOne({
      where: { email: registerDto.email }
    });

    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Crear paciente
    const patient = this.patientRepository.create({
      ...registerDto,
      password: hashedPassword,
      role: 'patient',
      dateOfBirth: new Date(registerDto.dateOfBirth),
    });

    const savedPatient = await this.patientRepository.save(patient);

    // Retornar sin contraseña
    const { password, ...result } = savedPatient;
    return result;
  }

  async registerDoctor(registerDto: RegisterDoctorDto) {
    // Verificar si el email ya existe
    const existingUser = await this.doctorRepository.findOne({
      where: { email: registerDto.email }
    });

    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Verificar si el número de licencia ya existe
    const existingLicense = await this.doctorRepository.findOne({
      where: { licenseNumber: registerDto.licenseNumber }
    });

    if (existingLicense) {
      throw new ConflictException('El número de licencia ya está registrado');
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Crear doctor
    const doctor = this.doctorRepository.create({
      ...registerDto,
      password: hashedPassword,
      role: 'doctor',
    });

    const savedDoctor = await this.doctorRepository.save(doctor);

    // Retornar sin contraseña
    const { password, ...result } = savedDoctor;
    return result;
  }

  async login(loginDto: LoginDto) {
    // Buscar en pacientes
    let patient = await this.patientRepository.findOne({
      where: { email: loginDto.email },
      select: ['id', 'email', 'password', 'role', 'name']
    });

    // Si no es paciente, buscar en doctores
    if (!patient) {
      const doctor = await this.doctorRepository.findOne({
        where: { email: loginDto.email },
        select: ['id', 'email', 'password', 'role', 'name']
      });

      if (!doctor) {
        throw new UnauthorizedException('Credenciales inválidas');
      }

      // Verificar contraseña
      const isPasswordValid = await bcrypt.compare(loginDto.password, doctor.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Credenciales inválidas');
      }

      // Retornar sin contraseña
      const { password, ...result } = doctor;
      return result;
    }

    // Verificar contraseña del paciente
    const isPasswordValid = await bcrypt.compare(loginDto.password, patient.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Retornar sin contraseña
    const { password, ...result } = patient;
    return result;
  }
} 