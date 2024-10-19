import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from 'class-validator';


export class CreateUserDto{
@ApiProperty()
@IsString()
@IsUUID()
id:string;


@ApiProperty()
@IsString()
firstName:string;

@ApiProperty()
@IsString()
middleName:string;
@ApiProperty()
@IsString()
lastName:string;

@ApiProperty()
@IsString()
phone:string

@ApiProperty()
@IsString()
password:string;

@ApiProperty()
@IsString()
email:string;
}

export class UpdateUserDto extends CreateUserDto {
    @ApiProperty()
    @IsUUID()
    id: string;
  }
  