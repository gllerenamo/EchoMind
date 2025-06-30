import { Controller, Post, Body, HttpCode, HttpStatus, ValidationPipe, UsePipes, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RegisterPatientDto, RegisterDoctorDto, LoginDto } from '../dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/patient')
  @UsePipes(new ValidationPipe({ transform: true }))
  async registerPatient(@Body() registerDto: RegisterPatientDto) {
    const result = await this.authService.registerPatient(registerDto);
    return {
      message: 'Paciente registrado exitosamente',
      data: result,
    };
  }

  @Post('register/doctor')
  @UsePipes(new ValidationPipe({ transform: true }))
  async registerDoctor(@Body() registerDto: RegisterDoctorDto) {
    const result = await this.authService.registerDoctor(registerDto);
    return {
      message: 'Médico registrado exitosamente',
      data: result,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return {
      message: 'Inicio de sesión exitoso',
      data: result,
    };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return {
      message: 'Perfil obtenido exitosamente',
      data: req.user,
    };
  }
} 