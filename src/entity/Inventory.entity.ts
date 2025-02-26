
import { Audit} from './audit.entity';

import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Store } from './store.entity';
import { Product } from './product.entity';


@Entity()
export class Inventory extends Audit{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Store, (store) => store.inventory)
  store: Store;

  @ManyToOne(() => Product, (product) => product.inventoryItems)
  product: Product;

  @Column()
  stock_level: number;
}
