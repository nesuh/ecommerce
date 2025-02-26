import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Store } from './store.entity';
import { Product } from './product.entity';
import { Audit } from './audit.entity';

@Entity()
export class Notification extends Audit{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Store)
    store: Store;

    @ManyToOne(() => Product)
    product: Product;

    @Column("text")
    message: string;

    @Column({ default: false })
    isRead: boolean;  

    @CreateDateColumn()
    createdAt: Date;
}
