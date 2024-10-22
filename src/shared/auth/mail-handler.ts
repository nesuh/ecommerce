// import { Injectable } from '@nestjs/common';
// import * as mailgun from 'mailgun-js';

// @Injectable()
// export class EmailService {
//   private mg;

//   constructor() {
//     this.mg = mailgun({
//       apiKey: process.env.MAILGUN_API_KEY,  // Private API Key
//       domain: process.env.MAILGUN_DOMAIN,   // Your Mailgun domain
//     });
//   }

//   async sendEmail(to: string, subject: string, template: string, variables: any) {
//     const data = {
//       from: 'Your App <noreply@yourdomain.com>',
//       to,
//       subject,
//       template,
//       'h:X-Mailgun-Variables': JSON.stringify(variables),  // Include variables for the email template
//     };

//     try {
//       const result = await this.mg.messages().send(data);
//       return result;
//     } catch (error) {
//       throw new Error('Error sending email');
//     }
//   }
// }
