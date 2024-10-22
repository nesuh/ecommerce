import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { ExtraCrudService } from "src/shared/service/extra-crud.service";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/user.dto";
import { userTypes } from "src/shared/enums/user.enum";
import * as dotenv from 'dotenv';
import { comparePassword, generateHashPassword } from "src/shared/auth/generateHashPassword";
import { EmailService } from "src/module/email/email.service";
import { generatedAuthToken } from "src/shared/auth/token-generator";
// EmailService // Assuming the EmailService is in this path

dotenv.config({ path: '.env' });

@Injectable()
export class UserService extends ExtraCrudService<User> {
    constructor(
        @InjectRepository(User)
        private readonly repositoryUser: Repository<User>,
        private readonly emailService: EmailService // Inject EmailService
    ) {
        super(repositoryUser);
    }

    async create(userUserDto: CreateUserDto) {
        try {
            // Hash the password
            userUserDto.password = await generateHashPassword(userUserDto.password);

            // Check for admin creation
            if (userUserDto.type === userTypes.ADMIN && userUserDto.secretToken !== process.env.ADMIN_SECRET_TOKEN) {
                throw new BadRequestException('Not allowed to create admin');
            }

            // Generate OTP
            const otp = Math.floor(Math.random() * 900000) + 100000;
            const otpExpiryTime = new Date();
            otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 10);

            // Create a new user
            const newUser = this.repositoryUser.create({
                ...userUserDto,
                otp,
                otpExpiryTime,
            });

            // If not an admin, send verification email
            if (newUser.type !== userTypes.ADMIN) {
                await this.emailService.sendEmail(
                    newUser.email,
                    'Email verification - Antenhe',
                    `<p>Dear ${newUser.name},</p>
                    <p>Your OTP for email verification is: <strong>${otp}</strong></p>`
                );
            }

            return {
                success: true,
                message: newUser.type === userTypes.ADMIN ? 'Admin created' :
                    'Please activate your account by verifying. We have sent you a mail with the OTP.',
                result: { email: newUser.email },
            };
        } catch (error) {
            throw new BadRequestException(error.message || 'Error creating user');
        }
    }

    async login(email: string, password: string) {
        try {
            const userExists = await this.repositoryUser.findOne({ where: { email } });
            if (!userExists) {
                throw new BadRequestException('Invalid email or password');
            }
            if (!userExists.isVerified) {
                throw new BadRequestException('Please verify your email');
            }
            const isPasswordMatch = await comparePassword(password, userExists.password);
            if (!isPasswordMatch) {
                throw new BadRequestException('User password does not match');
            }

            const token = await generatedAuthToken(userExists.id);
            return {
                success: true,
                message: 'Login successful',
                result: {
                    user: {
                        name: userExists.name,
                        email: userExists.email,
                        type: userExists.type,
                        id: userExists.id.toString(),
                    },
                    token,
                },
            };
        } catch (error) {
            throw new BadRequestException('Invalid email or password');
        }
    }
}
