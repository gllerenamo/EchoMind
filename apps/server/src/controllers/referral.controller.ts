import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import { CreateReferralDto } from "src/dto/create-referral.dto";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { ReferralService } from "src/services/referral.service";

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
}
