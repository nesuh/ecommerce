import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto, SendNotificationEventDto } from './email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body()sendEmailDto:SendEmailDto,
  ) {
    return await this.emailService.sendEmail(sendEmailDto.to, sendEmailDto.subject, sendEmailDto.body);
  }
  @Post('send-notification')
  async sendEMailNotification(
    @Body()emailPayload:SendNotificationEventDto,
  ):Promise<string>{
    return await this.emailService.sendNotificationEvent(emailPayload);
  }
}
