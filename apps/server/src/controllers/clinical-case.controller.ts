import { Controller, Post, Get, Param, Body, Patch, UseGuards, Request, ValidationPipe, UsePipes } from '@nestjs/common';
import { ClinicalCaseService } from '../services/clinical-case.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateClinicalCaseDto, UpdateClinicalCaseDto } from '../dto';

@UseGuards(JwtAuthGuard)
@Controller('cases')
export class ClinicalCaseController {
  constructor(private readonly clinicalCaseService: ClinicalCaseService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Request() req, @Body() dto: CreateClinicalCaseDto) {
    return this.clinicalCaseService.create(req.user.id, dto);
  }

  @Get()
  async findAll(@Request() req) {
    return this.clinicalCaseService.findAllForUser(req.user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return this.clinicalCaseService.findOne(id, req.user);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id: string, @Body() dto: UpdateClinicalCaseDto, @Request() req) {
    return this.clinicalCaseService.update(id, dto, req.user);
  }

  @Patch(':id/assign/:doctorId')
  async assignDoctor(@Param('id') id: string, @Param('doctorId') doctorId: string) {
    return this.clinicalCaseService.assignDoctor(id, doctorId);
  }
} 