import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';
import { Doctor } from '../entities/doctor.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') || 'fallback-secret',
    });
  }

  async validate(payload: any) {
    const { sub: userId, role } = payload;

    let user;
    if (role === 'patient') {
      user = await this.patientRepository.findOne({
        where: { id: userId },
        select: ['id', 'email', 'name', 'role', 'dateOfBirth', 'phoneNumber']
      });
    } else if (role === 'doctor') {
      user = await this.doctorRepository.findOne({
        where: { id: userId },
        select: ['id', 'email', 'name', 'role', 'licenseNumber', 'specialty', 'hospital', 'phoneNumber']
      });
    }

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return user;
  }
} 