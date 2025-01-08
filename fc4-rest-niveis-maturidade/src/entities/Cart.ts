import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customer } from "./Customer";
import { Product } from "./Product";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  uuid: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product, { eager: true })
  items: CartItem[];

  @ManyToOne(() => Customer)
  customer: Customer | null;

  @CreateDateColumn()
  createdAt: Date;
}

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;
}
