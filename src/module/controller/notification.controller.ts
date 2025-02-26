import { Controller, Post, Body, Get, Patch, Param } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { NotificationService } from '../service/notification.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly emailService: EmailService,
    private readonly notificationService: NotificationService
  ) {}

  @Post('email')
  async sendEmail(@Body() emailData: { email: string; subject: string; message: string }): Promise<void> {
    await this.emailService.sendEmail(emailData.email, emailData.subject, emailData.message);
  }

//   @Post()
//   async createNotif(@Body()  notificationData: { message: string; storedId: number; productId: number }) {
//     return await this.notificationService.create(notificationData);
//   }

  @Get(':storeId')
  async getNotifications(@Param('storeId') storeId: number) {
    return await this.notificationService.getStoreNotifications(storeId);
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: number) {
    return await this.notificationService.markAsRead(id);
  }
}
