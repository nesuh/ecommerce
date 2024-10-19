import { Controller } from "@nestjs/common";
import { User } from "src/entity/user.entity";
import { ExtraCrudController } from "src/shared/controller/extra-crud.controller";
import { UserService } from "./user.service";
import { ExtraCrudOptions } from "src/shared/crud-option.type";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";


const options:ExtraCrudOptions ={
    entityIdName:'id',
    createDto:CreateUserDto,
    updateDto:UpdateUserDto,
}
@Controller()
export class UserController extends ExtraCrudController<User>(
    options,
){
    constructor(
        private readonly userService:UserService
    ){
        super(userService)
    }

}