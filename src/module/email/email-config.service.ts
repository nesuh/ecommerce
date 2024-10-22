import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailConfig implements MailerOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  createMailerOptions(): MailerOptions | Promise<MailerOptions> {
    return {
      transport: {
        host: this.config.get<string>('EMAIL_SMTP'),
        port: this.config.get<number>('EMAIL_SMTP_PORT'),
        secure: false, // Use TLS
        auth: {
          user: this.config.get<string>('EMAIL_SMTP_USERNAME'),
          pass: this.config.get<string>('EMAIL_SMTP_PASSWORD'),
        },
      },
      defaults: {
        from: `"${this.config.get<string>('EMAIL_SMTP_DISPLAY_NAME')}" <${this.config.get<string>('EMAIL_SMTP_USERNAME')}>`,
      },
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }
}
