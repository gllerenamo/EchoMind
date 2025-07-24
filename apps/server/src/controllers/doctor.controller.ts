import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { Doctor } from '../entities/doctor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('doctors')
export class DoctorController {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  @Get()
  async findAll(@Request() req): Promise<Doctor[]> {
    if (req.user.role !== 'admin' || req.user.role !== 'doctor') {
      return [];
    }
    return this.doctorRepository.find({ select: ['id', 'name', 'email', 'specialty', 'licenseNumber', 'hospital'] });
  }
} 