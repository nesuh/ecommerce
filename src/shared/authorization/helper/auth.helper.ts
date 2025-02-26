/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';

@Injectable()
export class AuthHelper {
  constructor(private readonly jwt: JwtService) {}

  public async verify(token: string, secret: string) {
    const decoded: any = this.jwt.verify(token, { secret });

    if (!decoded) {
      throw new UnauthorizedException('invalid_token');
    }

    return decoded;
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Generate JWT Token
  public generateAccessToken(payload: any): string {
    return this.jwt.sign(
      { ...payload },
      {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
      },
    );
  }

  // Generate JWT Refresh Token
  public generateRefreshToken(payload: any): string {
    return this.jwt.sign(
      { ...payload },
      {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES,
      },
    );
  }

  public async generateToken(account: any) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(
        { id: account.id, email: account.email },
        {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
        },
      ),
      this.jwt.signAsync(
        { id: account.id },
        {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES,
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  // Validate User's password
  public compareHashedValue(
    originalValue: string,
    hashedValue: string,
  ): boolean {
    return bcrypt.compareSync(originalValue, hashedValue);
  }

  // Encode User's password
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(12);

    return bcrypt.hashSync(password, salt);
  }

  // Generate OTP
  public generateOpt(): string {
    const randomNumber = randomInt(100000, 999999);

    return randomNumber.toString();
  }

  public verifyEmailTemplateForOtp(
    fullName: string,
    username: string,
    otp: string,
    duration: number,
  ) {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Static Template</title>

    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body
    style="
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background: #ffffff;
      font-size: 14px;
    "
  >
      <header>
        <table style="width: 100%;">
          <tbody>
            <tr style="height: 0;">
              <td>
              </td>
              <td style="text-align: right;">
                <span
                  style="font-size: 16px; line-height: 30px; color: #ffffff;"
                  >Oct 20, 2023</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </header>

      <main>
        <div
          style="
            padding: 92px 30px 115px;
            background: #ffffff;
            border-radius: 30px;
            text-align: center;
          "
        >
          <div style="width: 100%; max-width: 489px; margin: 0 auto;">
            <p
              style="
                margin: 0;
                margin-top: 5px;
                font-size: 16px;
                font-weight: 500;
              "
            >
              Hey ${fullName},
            </p>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-weight: 500;
                letter-spacing: 0.56px;
              "
            >
              Use the following OTP
              to complete the procedure to verify your email address. OTP is
              valid for
              <span style="font-weight: 600; color: #1f1f1f;">${duration} minutes</span>.
              Do not share this code with others.
            </p>
            <p
              style="
                margin: 0;
                margin-top: 24px;
                font-size: 16px;
                font-weight: 500;
              "
            >
              Your Username
            </p>
            <p
              style="
                 margin: 0;
                margin-top: 17px;
                font-size: 28px;
                font-weight: 600;
              "
            >
              ${username}
            </p>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-size: 24px;
                font-weight: 500;
                color: #1f1f1f;
              "
            >
              Your OTP
            </p>
            <p
              style="
                font-size: 40px;
                font-weight: 600;
                letter-spacing: 25px;
                color: #fafafa;
                background-color: #0d7801;
              "
            >
              ${otp}
            </p>
          </div>
        </div>

        <p
          style="
            max-width: 400px;
            margin: 0 auto;
            margin-top: 90px;
            text-align: center;
            font-weight: 500;
            color: #8c8c8c;
          "
        >
          Need help? Ask at
          <a
            href="mailto:megp@gmail.com"
            style="color: #499fb6; text-decoration: none;"
            >megp@gmail.com</a
          >
          or visit our
          <a
            href=""
            target="_blank"
            style="color: #499fb6; text-decoration: none;"
            >Help Center</a
          >
        </p>
      </main>

      <footer
        style="
          width: 100%;
          max-width: 490px;
          margin: 20px auto 0;
          text-align: center;
          border-top: 1px solid #e6ebf1;
        "
      >
        <p
          style="
            margin: 0;
            margin-top: 40px;
            font-size: 16px;
            font-weight: 600;
            color: #434343;
          "
        >
          egp Malawi
        </p>
        <p style="margin: 0; margin-top: 8px; color: #434343;">
          Lilongwe 3, Malawi.
        </p>
        <div style="margin: 0; margin-top: 16px;">
          <a href="" target="_blank" style="display: inline-block;">
            <img
              width="36px"
              alt="Facebook"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook"
            />
          </a>
          <a
            href=""
            target="_blank"
            style="display: inline-block; margin-left: 8px;"
          >
            <img
              width="36px"
              alt="Instagram"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram"
          /></a>
          <a
            href=""
            target="_blank"
            style="display: inline-block; margin-left: 8px;"
          >
            <img
              width="36px"
              alt="Twitter"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter"
            />
          </a>
          <a
            href=""
            target="_blank"
            style="display: inline-block; margin-left: 8px;"
          >
            <img
              width="36px"
              alt="Youtube"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube"
          /></a>
        </div>
        <p style="margin: 0; margin-top: 16px; color: #434343;">
          Copyright © 2022 Company. All rights reserved.
        </p>
      </footer>
    </div>
  </body>
</html>
`;
  }
}
