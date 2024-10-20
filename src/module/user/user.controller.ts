import { Body, Controller, HttpCode, HttpStatus, Post, Res } from "@nestjs/common";
import { User } from "src/entity/user.entity";
import { ExtraCrudController } from "src/shared/controller/extra-crud.controller";
import { UserService } from "./user.service";
import { ExtraCrudOptions } from "src/shared/crud-option.type";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import { Response } from "express"; // Import Response from express

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
        @Res({ passthrough: true }) response: Response, // Ensure Response is correctly typed
    ) {
        const loginRes = await this.userService.login(
            loginUser.email,
            loginUser.password,
        );

        if (loginRes.success) {
            response.cookie('_digi_auth_token', loginRes.result?.token, {
                httpOnly: true,
            });
            return {
                message: 'Login successful',
                success: true,
                user: loginRes.result?.user, // Return user information if needed
            };
        } 
        // else {
        //     return {
        //         message: 'Login failed',
        //         success: false,
        //     };
        // }
        delete loginRes.result?.token;
        return loginRes;
    }
}
