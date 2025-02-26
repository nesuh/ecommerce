/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  MaxLength,
  MinLength,
  Matches
} from 'class-validator';


export class CurrentUserDto {
  id: string;
  username: string;
  role: string;
  permissions: string[]; // List of permissions
}

export class CreateAccountDto {
  @ApiProperty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsString()
  public firstName: string;

  @ApiProperty()
  @IsString()
  public lastName: string;

  @ApiProperty()
  @IsString()
  public phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(Number(process.env.PASSWORD_MIN_LENGTH ?? 8))
  @MaxLength(Number(process.env.PASSWORD_MAX_LENGTH ?? 25))
  @Matches(/(?=.*[0-9])/, {
    message: 'Password must contain at least one number.',
  })
  @Matches(/(?=.*[!@#$%^&*])/, {
    message: 'Password must contain at least one special character.',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter.',
  })
  @Matches(/(?=.*[a-z])/, {
    message: 'Password must contain at least one lowercase letter.',
  })
  public password: string;
  
  @ApiProperty()
  @IsBoolean()
  public isPhoneVerified: boolean;
}

export class VerifyAccountDto {
  @ApiProperty()
  @IsString()
  public verificationId: string;

  @ApiProperty()
  @IsString()
  public otp: string;

  @ApiProperty()
  @IsBoolean()
  public isOtp: boolean;
}

export class ResendOtpDto {
  @ApiProperty()
  @IsString()
  public verificationId: string;
}

export class UpdateAccountDto {
  @ApiProperty()
  @IsString()
  public firstName: string;

  @ApiProperty()
  @IsString()
  public lastName: string;
}

export class UpdateAccountProfileDto {
  @ApiProperty()
  @IsObject()
  public extendedProfile: any;
}

export class ChangeEmailRequestDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  public newEmail: string;
}
