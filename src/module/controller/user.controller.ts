/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, SetMetadata, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AllowAnonymous, CurrentUser, JwtGuard, PermissionsGuard } from "src/shared/authorization";
import { AccountService } from "../service/user.service";
import { CreateAccountDto } from "../dto/account.dto";
import { LoginDto, LoginResponseDto } from "../dto/login.dto";
import { Permissions } from "src/shared/authorization/models/auth.model";
import { AccountRoleEnum } from "src/shared/enums/account-status.enum";



ApiTags('full Authorization and Authentication bro!')
@Controller('nesuh')
export class AccountController{
constructor(
private readonly accountService:AccountService
){}


@Post('sign-up')
@AllowAnonymous()
async createAccount(
@Body() createAccountDto:CreateAccountDto
):Promise<any>{
return this.accountService.createAccount(createAccountDto,AccountRoleEnum.ADMIN)
}

@Post('admin/create-manager')
@UseGuards(PermissionsGuard(Permissions.CREATE_MANAGER))
async createManager(@Body() createAccountDto: CreateAccountDto) {
  return this.accountService.createAccount(createAccountDto, AccountRoleEnum.MANAGER);
}

@Post('manager/create-employer')
@UseGuards(PermissionsGuard(Permissions.CREATE_EMPLOYER))
async createEmployer(@Body() createAccountDto: CreateAccountDto) {
  return this.accountService.createAccount(createAccountDto, AccountRoleEnum.EMPLOYEES);
}

@Post('login')
@AllowAnonymous()
async loginAccount(@Body() loginAccountDto:LoginDto):Promise<LoginResponseDto | never>{
    return this.accountService.login(loginAccountDto)
}
@Get('me')
@UseGuards(JwtGuard) 
async getUser(@CurrentUser() user:any):Promise<any>{
    return this.accountService.getUserDetail(user.id)
}

@Get('permissions')
@UseGuards(JwtGuard) // Ensure only logged-in users can access this
@ApiBearerAuth()
@ApiOperation({ summary: 'Get user permissions' })
async getPermissions(@CurrentUser() user: any): Promise<string[]> {
  return this.accountService.getUserPermissions(user.id);
}

}