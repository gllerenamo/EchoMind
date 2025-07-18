import { Controller, Post, Get, Param, Body, UseGuards, Request, ValidationPipe, UsePipes } from '@nestjs/common';
import { MessageService } from '../services/message.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('cases/:caseId/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async sendMessage(@Param('caseId') caseId: string, @Request() req, @Body('content') content: string) {
    return this.messageService.sendMessage(caseId, req.user, content);
  }

  @Get()
  async getMessages(@Param('caseId') caseId: string, @Request() req) {
    return this.messageService.getMessages(caseId, req.user);
  }
} 