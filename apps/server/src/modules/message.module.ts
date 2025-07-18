import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController, MessageHistoryController } from '../controllers/message.controller';
import { MessageService } from '../services/message.service';
import { Message, ClinicalCase, Patient, Doctor } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Message, ClinicalCase, Patient, Doctor])],
  controllers: [MessageController, MessageHistoryController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {} 