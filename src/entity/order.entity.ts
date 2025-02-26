import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Store } from './store.entity';
import { Product } from './product.entity';
import { Audit } from './audit.entity';

@Entity()
export class Order extends Audit {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Store, (store) => store.inventory)
    store: Store;

    @ManyToOne(() => Product, (product) => product.inventoryItems)
    product: Product;

    @Column()
    quantity: number;  

    @Column()
    status: string;  

    @CreateDateColumn()
    createdAt: Date;
}
