import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { NotificationTypeEnum, SendNotificationEventDto } from './email.dto';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendEmail(email: string, subject: string, body: string) {
    try {
      const result = await this.mailerService.sendMail({
        to: email,
        subject: subject,
        html: body,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
public async sendNotificationEvent(emailPayload:SendNotificationEventDto){
//  const  result = await this.mailerService.sendNotificationEvent(emailPayload){
  if(emailPayload.type!=NotificationTypeEnum.EMAIL){
    throw new BadRequestException('Notification Type must be Email!')
      }
    
      emailPayload.application='Tendering'
      emailPayload.phoneNumber='0960948969'
      emailPayload.subject= 'Congratulations! You Have Been Awarded the Tender'
      emailPayload.detailContent=`Dear  'Antenhe Sileshi'|| 'Mubarak Endrie',\n\nWe are pleased to inform you that your bid for the has been successful. Your submission has been thoroughly evaluated and has met all the required criteria. We have officially approved your endorsement as the winning bidder.\n\nPlease review the attached documents for further details on the next steps.\n\nCongratulations once again on your success!\n\nBest regards,`
      emailPayload.shortContent=`Congratulations! Your bid for $lots[0]tender name has been successful. Please check your email for further details.`
      emailPayload.receivers=[process.env.EMAIL_SMTP_EMAIL || 'antenhesileshi@gmail.com']
  
  const emailBody = `
      <h1>${emailPayload.application}</h1>
      <p><strong>Phone Number:</strong> ${emailPayload.phoneNumber}</p>
      <p>${emailPayload.detailContent}</p>
      <p>Short Summary: ${emailPayload.shortContent}</p>
    `;

   
    const result = await this.mailerService.sendMail({
      to: emailPayload.receivers,
      subject: emailPayload.subject,
      html: emailBody, 
    });
    return result;
 }  
}
 