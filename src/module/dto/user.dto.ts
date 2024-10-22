import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import { userTypes } from "src/shared/enums/user.enum";
export class CreateUserDto{
    static email(email: any) {
        throw new Error("Method not implemented.");
    }
@ApiProperty()
@IsNotEmpty()
@IsString()
name:string;


@ApiProperty()
@IsNotEmpty()
@IsString()
email:string;

@ApiProperty()
@IsNotEmpty()
@IsString()
password:string;

@ApiProperty()
@IsNotEmpty()
@IsString()
@IsIn([userTypes.ADMIN,userTypes.CUSTOMER])
type:string;

@ApiProperty()
@IsString()
@IsOptional()
secretToken:string
    static type: userTypes;
    static password: any;
    static secretToken: string;

}

export class UpdateUserDto extends CreateUserDto {
    name: string;
    oldPassword?:string;
    newPassword?:string;
  }

  