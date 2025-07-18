import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Referral } from "src/entities/referral.entity";
import { Doctor } from "src/entities/doctor.entity";
import { ClinicalCase } from "src/entities/clinical-case.entity";
import { ReferralController } from "src/controllers/referral.controller";
import { ReferralService } from "src/services/referral.service";

@Module({
  imports: [TypeOrmModule.forFeature([Referral, Doctor, ClinicalCase])],
  controllers: [ReferralController],
  providers: [ReferralService],
})
export class ReferralModule {}
