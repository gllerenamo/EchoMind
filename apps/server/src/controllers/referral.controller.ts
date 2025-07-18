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
