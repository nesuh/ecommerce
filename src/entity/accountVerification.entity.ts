/* eslint-disable prettier/prettier */
import {
Column,
Entity,
JoinColumn,
ManyToOne,
PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountVerificationStatusEnum } from 'src/shared/enums/account-verification-status.enum';
import { AccountVerificationTypeEnum } from 'src/shared/enums/account-verification-type.enum';
import { Account } from './account.entity';
import { Audit } from './audit.entity';


@Entity('account_verifications')
export class AccountVerification extends Audit{
@PrimaryGeneratedColumn('uuid')
public id: string;

@Column({ type: 'text' })
public otp: string;

@Column({
type: 'enum',
enum: AccountVerificationStatusEnum,
default: AccountVerificationStatusEnum.NEW,
})
public status: string;

@Column({
type: 'enum',
enum: AccountVerificationTypeEnum,
default: AccountVerificationTypeEnum.EMAIL_VERIFICATION,
})
public otpType: string;

@Column({ type: 'text' })
public accountId: string;

@ManyToOne(() => Account, (account) => account.accountVerifications)
@JoinColumn({name:'accountId'})
public account:Account

@Column({ type: 'text', nullable: true })
public userId: string;
Account: any;
}