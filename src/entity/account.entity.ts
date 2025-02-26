/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AccountVerification } from "./accountVerification.entity";
import { AccountRoleEnum, AccountStatusEnum } from "src/shared/enums/account-status.enum";
import { User } from "./user.entity";
import { AccountCredential } from "./account-credential.entity";
import { Store } from "./store.entity";


@Entity('account')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  username: string;

  @Column({ type: 'text', nullable: true, unique: true })
  email: string;

  @Column({ type: 'text' })
  firstName: string;

  @Column({ type: 'text' })
  lastName!: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  phone: string;
  @Column({
    type: 'enum',
    enum: AccountStatusEnum,
    default: AccountStatusEnum.PENDING,
  })
  status: string;
  
  @Column({ type: 'boolean', default: true })
  isPhoneVerified: boolean;
  

  @OneToMany(() => AccountVerification, (accountVerifications) => accountVerifications.account, {
    cascade: true,
  })
  accountVerifications: AccountVerification[];

  @OneToMany(() => User, (user) => user.account, {
    cascade:true,
    onDelete: 'CASCADE',
  })
  users: User[];

  @OneToOne(() => AccountCredential, (accountCredential) => accountCredential.account, {
    cascade: true,
  })
  accountCredential: AccountCredential;

  @Column({
    type:'enum',
    enum:AccountRoleEnum,
    default:AccountRoleEnum.EMPLOYEES
  })
  role:AccountRoleEnum

  @OneToMany(() => Store, (store) => store.owner)
  stores: Store[];
  
  @Column({ type: 'simple-array', nullable: true })
  permissions: string[];
  
}
