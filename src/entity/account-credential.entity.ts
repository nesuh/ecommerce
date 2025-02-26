import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
  } from 'typeorm';
    
  import { Account } from './account.entity';
  
  @Entity({ name: 'account_credentials' })
  export class AccountCredential {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'text', nullable: true })
    password: string;
  
    @Column({
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
    })
    passwordLastChangedAt: Date;
  
    @Column({ unique: true ,type:'text'})
    accountId: string;
  
    @OneToOne(() => Account, (account) => account.accountCredential, {
      orphanedRowAction: 'delete',
    })
    @JoinColumn({ name: 'accountId' })
    account: Account;
  }
  