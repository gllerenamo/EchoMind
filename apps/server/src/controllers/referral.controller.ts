import { Controller, Post, Get, Param, Body, UseGuards, Req, Request } from '@nestjs/common';
import { ReferralService } from '../services/referral.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateReferralDto } from '../dto/create-referral.dto';

@Controller('referrals')
@UseGuards(JwtAuthGuard)
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  @Post()
  async create(@Req() req, @Body() dto: CreateReferralDto) {
    const doctorId = req.user.id;
    return this.referralService.createReferral(doctorId, dto);
  }

  @Get(':clinicalCaseId')
  async getAll(@Param('clinicalCaseId') clinicalCaseId: number) {
    return this.referralService.getReferralsByCase(clinicalCaseId);
  }

  @Get('/user/all')
  async getUserReferrals(@Request() req) {
    return this.referralService.getReferralsByUser(req.user);
  }
}
