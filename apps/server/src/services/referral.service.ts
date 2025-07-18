@Injectable()
export class ReferralService {
  constructor(
    @InjectRepository(Referral)
    private referralRepo: Repository<Referral>,
    private clinicalCaseRepo: Repository<ClinicalCase>,
    private doctorRepo: Repository<Doctor>,
  ) {}

  async createReferral(fromDoctorId: number, dto: CreateReferralDto) {
    const clinicalCase = await this.clinicalCaseRepo.findOneBy({ id: dto.clinicalCaseId });
    const toDoctor = await this.doctorRepo.findOneBy({ id: dto.toDoctorId });
    const fromDoctor = await this.doctorRepo.findOneBy({ id: fromDoctorId });

    const referral = this.referralRepo.create({
      clinicalCase,
      fromDoctor,
      toDoctor,
      reason: dto.reason,
    });

    return this.referralRepo.save(referral);
  }

  async getReferralsByCase(clinicalCaseId: number) {
    return this.referralRepo.find({
      where: { clinicalCase: { id: clinicalCaseId } },
      relations: ['fromDoctor', 'toDoctor'],
      order: { createdAt: 'DESC' },
    });
  }
}
