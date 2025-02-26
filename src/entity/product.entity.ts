import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Audit } from "./audit.entity";
import { Inventory } from "./Inventory.entity";

@Entity()
export class Product extends Audit{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @Column()
    uOMName:string

    @Column()
    price:number

    @Column()
    threshold:number

    @OneToMany(() => Inventory, (inventory) => inventory.product)
    inventoryItems: Inventory[];
}