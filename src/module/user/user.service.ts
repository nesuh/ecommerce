import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { ExtraCrudService } from "src/shared/service/extra-crud.service";
import { DataSource, Repository } from "typeorm";
import { CreateUserDto } from "../dto/user.dto";
import { generate } from "rxjs";
import { userTypes } from "src/shared/enums/user.enum";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import { comparePassword, generateHashPassword } from "src/shared/auth/generateHashPassword";
@Injectable()
export class UserService extends ExtraCrudService<User>{

    constructor(

        @InjectRepository(User)
        private readonly repositoryUser:Repository<User>
        // private dataSource: DataSource,
    ){
        super(repositoryUser)
    }

    async create(
        userUserDto:CreateUserDto
    ){
        try{
CreateUserDto.password = await generateHashPassword(
    userUserDto.password,
);
if(CreateUserDto.type === userTypes.ADMIN && CreateUserDto.secretToken === process.env.ADMIN_SECRET_TOKEN ){
    throw new BadRequestException('Not allowed to create admin')
}
 

const otp=Math.floor(Math.random() * 900000) + 100000

const otpExpiryTime=new Date();
otpExpiryTime.setMinutes(otpExpiryTime.getMinutes()*10)

const newUser= await this.repositoryUser.create({
    ...CreateUserDto,
    otp,
    otpExpiryTime,
})
if(newUser.type !== userTypes.ADMIN){
    sendEmail(
        newUser.email,
        config.get('emailService.emailTemplates.verifyEmail'),
        'Email verification -Digizone',
        {
            customerName:newUser.name,
            customerEmail:newUser.email,
            otp,
        }
    )
}
return {
    success:true,
    message:newUser.type ===userTypes.ADMIN ? 'Admin created':
    'Pleae activate your account by verifiing your we have sent you a mail witj the otp',
    result:{email:newUser.email}

}
}catch(error){
throw error;
        }
    }

    async login(
        email:string,
        password:string
    ){
        try{

        
      const userExists=await this.repositoryUser.findOne({
        email
    });
    if(!userExists){
        throw new BadRequestException('Invalid email or password')
    }
    if(!userExists.isVerified){
        throw new BadRequestException('Please verify your email')
    }
    const isPasswordMatch=await comparePassword(
        password,
        userExists.password
    )
if(!isPasswordMatch){
    throw new BadRequestException('user password not match ')
}
const token =await generatedAuthToken(userExists._id)

return {
    success:true,
    message:'Login successful',
    result:{
        user:{
            name:userExists.name,
            email:userExists.email,
            type:userExists.type,
            id:userExists._id.toString(),
        },
        token,
    }
}
        }catch(error){
        throw new BadRequestException('Invalid email or password')
      }
    
    }

}

// function generateHashPassword(password: string): any {
//     throw new Error("Function not implemented.");
// }
