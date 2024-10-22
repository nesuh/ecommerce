import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailConfig } from './email-config.service'; // Adjust the path as needed
import { EmailService } from './email.service';
import { EmailController } from './email.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule available globally
    }),
    MailerModule.forRootAsync({
      useClass: EmailConfig, // Ensure EmailConfig is set as the provider for MailerModule
    }),
  ],
  controllers:[EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
