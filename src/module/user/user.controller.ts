import { Body, Controller, HttpCode, HttpStatus, Post, Res } from "@nestjs/common";
import { User } from "src/entity/user.entity";
import { ExtraCrudController } from "src/shared/controller/extra-crud.controller";
import { UserService } from "./user.service";
import { ExtraCrudOptions } from "src/shared/crud-option.type";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import { Response } from "express";

const options: ExtraCrudOptions = {
    entityIdName: 'id',
    createDto: CreateUserDto,
    updateDto: UpdateUserDto,
};

@Controller('users')
export class UserController extends ExtraCrudController<User>(options) {
    constructor(
        private readonly userService: UserService
    ) {
        super(userService);
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async login(
        @Body() loginUser: { email: string; password: string },
        @Res({ passthrough: true }) response: Response,
    ) {
        try {
            // Call the login method from UserService
            const loginRes = await this.userService.login(
                loginUser.email,
                loginUser.password,
            );

            // Set a cookie if the login is successful
            if (loginRes.success) {
                response.cookie('_digi_auth_token', loginRes.result?.token, {
                    httpOnly: true,
                });

                // Return the response with user information
                return {
                    message: 'Login successful',
                    success: true,
                    user: loginRes.result?.user,
                };
            }

            // Handle failed login case (optional)
            return {
                message: 'Login failed',
                success: false,
            };
        } catch (error) {
            // Handle any unexpected errors
            return {
                message: 'An error occurred during login',
                success: false,
                error: error.message,
            };
        }
    }
}
