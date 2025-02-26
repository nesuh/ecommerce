/* eslint-disable prettier/prettier */
import { AccountVerificationStatusEnum } from "src/shared/enums/account-verification-status.enum";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./account.entity";
import { Store } from "./store.entity";
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: AccountVerificationStatusEnum,
    default: AccountVerificationStatusEnum.NEW,
  })
  public status: string;

  @Column({ type: 'text' })
  public accountId: string;

  @ManyToOne(() => Account, (account) => account.users)
  @JoinColumn({ name: 'accountId' })
  public account: Account;


  @OneToMany(() => Store, (store) => store.owner)
  stores: Store[];
}
