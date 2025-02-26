import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Inventory } from "./Inventory.entity";
import { Audit } from "./audit.entity";
import { User } from "./user.entity";
import { Account } from "./account.entity";


@Entity()
export class Store extends Audit{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @OneToMany(() => Inventory, (inventory) => inventory.store)
  inventory: Inventory[];
//   Each store has a unique set of inventory entries for each product it stocks.
@ManyToOne(() => Account, (account) => account.stores)
owner: Account;
}
