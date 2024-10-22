import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { EmailModule } from "src/module/email/email.module";


@Module({
imports:[
TypeOrmModule.forFeature([
    User,
   
]),
EmailModule,
],
providers:[UserService],
controllers:[UserController],
exports:[
    UserService
]
})
export class UserModule{}