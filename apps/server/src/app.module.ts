import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth.module';
import { ClinicalCaseModule } from './modules/clinical-case.module';
import { getDatabaseConfig } from './config/database.config';
import { ReferralModule } from './modules/referral.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => getDatabaseConfig(configService),
      inject: [ConfigService],
    }),
    AuthModule,
    ClinicalCaseModule,
    ReferralModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
