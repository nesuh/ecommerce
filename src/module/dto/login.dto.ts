/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  public username: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(Number(process.env.PASSWORD_MIN_LENGTH ?? 5))
  @MaxLength(Number(process.env.PASSWORD_MAX_LENGTH ?? 25))
  public password: string;

  @ApiProperty({
    default: 'PORTAL',
  })
  @IsEnum(['PORTAL', 'BACK-OFFICE'])
  @IsOptional()
  public origin = 'PORTAL';
}

export class GoogleLogin {
  @ApiProperty()
  @IsNotEmpty()
  public token: string;
}

// export class LoginResponseDto {
//   @ApiProperty()
//   public is_security_question_set?: boolean;
//   @ApiProperty()
//   public is_password_expired?: boolean;
//   @ApiProperty()
//   public access_token: string;
//   @ApiProperty()
//   public refresh_token?: string;
// }
export class LoginResponseDto {
  @ApiProperty()
  public access_token: string;
  @ApiProperty()
  public refresh_token?: string;
}
export class UserInfoDto {
  public access_token: string;
}

export class ForgetPasswordDto {
  @ApiProperty()
  @IsEmail()
  public email: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  public verificationId: string;

  @ApiProperty()
  @IsString()
  public otp: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(Number(process.env.PASSWORD_MIN_LENGTH ?? 5))
  @MaxLength(Number(process.env.PASSWORD_MAX_LENGTH ?? 25))
  public password: string;

  @ApiProperty()
  @IsBoolean()
  public isOtp: boolean;
}

export class AcceptAccountDto {
  @ApiProperty()
  @IsNotEmpty()
  public verificationId: string;

  @ApiProperty()
  @IsString()
  public otp: string;

  @ApiProperty()
  @IsBoolean()
  public isOtp: boolean;
}

export class ChangePasswordDto {
  public accountId: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(Number(process.env.PASSWORD_MIN_LENGTH ?? 5))
  @MaxLength(Number(process.env.PASSWORD_MAX_LENGTH ?? 25))
  public oldPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(Number(process.env.PASSWORD_MIN_LENGTH ?? 5))
  @MaxLength(Number(process.env.PASSWORD_MAX_LENGTH ?? 25))
  public newPassword: string;
}

export class ResetAccountPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  public accountId: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(Number(process.env.PASSWORD_MIN_LENGTH ?? 5))
  @MaxLength(Number(process.env.PASSWORD_MAX_LENGTH ?? 25))
  public password: string;
}
