import { 
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, 
  IsEnum,
  IsOptional,
  IsString,
  IsArray,
  IsObject,
  ValidateNested,
 } from 'class-validator';
 import { Type } from 'class-transformer';  

export class SendEmailDto {
  @ApiProperty({ example: 'recipient@example.com', description: 'The email address of the recipient' })
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @ApiProperty({ example: 'Hello there!', description: 'The subject of the email' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ example: 'This is the body of the email.', description: 'The content of the email' })
  @IsString()
  @IsNotEmpty()
  body: string;
}



export enum NotificationTypeEnum {
  EMAIL = 'EMAIL',
  MESSAGE = 'MESSAGE',
  INBOX = 'INBOX',
}

enum NotificationStatusEnum {
  SUCCEED = 'SUCCEED',
  FAILED = 'FAILED',
}

export class AttachmentDto {
  @ApiProperty()
  @IsString()
  filename: string;

  @ApiProperty()
  @IsString()
  pdfTemplateName: string;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  data: any;
}

export class SendNotificationEventDto {
  @ApiProperty({ enum: NotificationTypeEnum })
  @IsEnum(NotificationTypeEnum)
  type: NotificationTypeEnum;

  @ApiProperty()
  @IsString()
  application: string;

  @ApiProperty()
  @IsString()
  subject: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  detailContent: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  shortContent: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  receivers: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  template?: string;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  templateParameters?: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  cc?: string[];

  status?: NotificationStatusEnum;
  errorMessage?: string;
}