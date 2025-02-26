/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthHelper } from "src/shared/authorization";
import { Repository } from "typeorm";


import { AccountVerificationStatusEnum } from "src/shared/enums/account-verification-status.enum";
import { Account } from "src/entity/account.entity";
import { CreateAccountDto } from "../dto/account.dto";
import { AccountStatusEnum } from "src/shared/enums/account-status.enum";
import { AccountCredential } from "src/entity/account-credential.entity";
import { User } from "src/entity/user.entity";
import { LoginDto, LoginResponseDto } from "../dto/login.dto";
import { Permissions } from "src/shared/authorization/models/auth.model";

@Injectable()
export class AccountService{
constructor(
    @InjectRepository(Account)
    private readonly repositoryAccount:Repository<Account>,
    private readonly helper: AuthHelper
){}

async createAccount(accountData:CreateAccountDto,role:string):Promise<any>{


 const account = await this.repositoryAccount.findOne({
    where:[
       { email:accountData.email.toLocaleLowerCase(),
         phone:accountData.phone }
    ]
    
 })
 if(!account){
  await this.createNewAccount(accountData,AccountStatusEnum.PENDING,role)
 }else{
  throw new BadRequestException(`bro your was create account email :${account.email} and phone number:${account.phone}`)
 }
}
async createNewAccount(accountData:CreateAccountDto,status:AccountStatusEnum,role):Promise<any>{
    const {firstName,lastName,password,email,phone}=accountData

    const account=new Account()
    account.firstName=firstName
    account.lastName=lastName
    account.email=email?.toLocaleLowerCase()
    account.phone=phone
    account.username=this?.generateUsername()
    account.status=status
    account.role=role
      // Assign permissions based on role
  if (role === 'MANAGER') {
    account.permissions = [Permissions.CREATE_EMPLOYER];
  } else if (role === 'ADMIN') {
    account.permissions = [Permissions.CREATE_MANAGER, Permissions.CREATE_EMPLOYER];
  }
    if(password){
     const accountCredential=new AccountCredential()
     accountCredential.password=this.helper.encodePassword(password)
     accountCredential.passwordLastChangedAt=new Date()
     account.accountCredential= accountCredential;
    }
    const user=new User()
    user.accountId=account.id
    user.status=AccountVerificationStatusEnum.NEW
  
    await this.repositoryAccount.save(account)
    return  account
}
private generateUsername() {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    const numbers = '0123456789';
    const numbersLength = numbers.length;
    for (let i = 0; i < 4; i++) {
      result += numbers.charAt(Math.floor(Math.random() * numbersLength));
    }

    return 'mu-' + result;
  }

  async login(loginData:LoginDto):Promise<LoginResponseDto | never>{
    let  username=loginData.username
    if(!username){
      throw new BadRequestException('please insert User Name ')
    }
    
     username=username.toLocaleLowerCase()

  
    const account=await this.repositoryAccount.findOne({
      where:{
        username,
      },
      relations:{ 
        accountCredential:true
      }
    })
if(!account){
  throw new BadRequestException('empty checklist using these username ')
}
    const password=loginData.password
  
    // compareHashedValue()
    const  isPasswordValid:boolean=this.helper.compareHashedValue(
      password,
      account.accountCredential.password
    )
    if(!isPasswordValid){
      throw new BadRequestException('invalid password!')
    }

    // const tokenPayload = await this.helper.generateAccessTokenPayload(
    //   account.id,
    //   loginData.origin,
    // );
  const token:LoginResponseDto={
    access_token:this.helper.generateAccessToken({
      id:account.id,
      origin:loginData.origin  
    }),
    refresh_token:this.helper.generateRefreshToken({
      id:account.id,
      origin:loginData.origin
    })
  }

  return token

    
  }

  async getUserDetail(accountId: string):Promise<any> {
    const userInfo = await this.getUserDetail(accountId);

    const tokenPayload = {
      tenantId: userInfo.tenantId,
      id: userInfo.id,
      username: userInfo.username,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
    };

    return tokenPayload;
  }
  async getuserInfo(id:string){
    const accountInfo=await this.repositoryAccount.findOne({
      where:{
        id
      }
    })
    return accountInfo
  }

  async getUserPermissions(userId: string): Promise<string[]> {
    const user = await this.repositoryAccount.findOne({
      where: { id: userId },
      relations: ['permissions'],
    });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    return user.permissions;
  }
  
}