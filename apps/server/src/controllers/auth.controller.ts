import { Controller, Post, Body, HttpCode, HttpStatus, ValidationPipe, UsePipes } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterPatientDto, RegisterDoctorDto, LoginDto } from '../dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/patient')
  @UsePipes(new ValidationPipe({ transform: true }))
  async registerPatient(@Body() registerDto: RegisterPatientDto) {
    const patient = await this.authService.registerPatient(registerDto);
    return {
      message: 'Paciente registrado exitosamente',
      data: patient,
    };
  }

  @Post('register/doctor')
  @UsePipes(new ValidationPipe({ transform: true }))
  async registerDoctor(@Body() registerDto: RegisterDoctorDto) {
    const doctor = await this.authService.registerDoctor(registerDto);
    return {
      message: 'Médico registrado exitosamente',
      data: doctor,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    return {
      message: 'Inicio de sesión exitoso',
      data: user,
    };
  }
} 