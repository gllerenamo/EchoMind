@Module({
  imports: [TypeOrmModule.forFeature([Referral, Doctor, ClinicalCase])],
  controllers: [ReferralController],
  providers: [ReferralService],
})
export class ReferralModule {}
