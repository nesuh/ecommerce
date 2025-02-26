import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmailModule } from "src/module/email/email.module";
import { NotificationService } from "./service/notification.service";
import { NotificationController } from "./controller/notification.controller";
import { InventoryService } from "./service/inventory.service";
import { ProductService } from "./service/product.service";
import { ProductController } from "./controller/product.controller";
import { InventoryController } from "./controller/inventory.controller";
import { OrderController } from "./controller/order.controller";
import { OrderService } from "./service/order.service";
import { StoreService } from "./service/store.service";
import { StoreController } from "./controller/store.controller";
import { Inventory } from "src/entity/Inventory.entity";
import { Order } from "src/entity/order.entity";
import { Store } from "src/entity/store.entity";
import { Product } from "src/entity/product.entity";
import { Notification } from "src/entity/notifications.entity";
import { User } from "src/entity/user.entity";
import { AccountCredential } from "src/entity/account-credential.entity";
import { Account } from "src/entity/account.entity";
import { AccountVerification } from "src/entity/accountVerification.entity";
import { AccountService } from "./service/user.service";
import { AccountController } from "./controller/user.controller";
import { AuthorizationModule } from "src/shared/authorization";



@Module({
imports:[
    AuthorizationModule,
    TypeOrmModule.forFeature([
    Inventory,User,Notification,Order,Store,Product,AccountCredential,Account,AccountVerification,]),
    EmailModule,

],
providers:[
AccountService,
    NotificationService,
    InventoryService,
    ProductService,
    InventoryService,
    OrderService,
    StoreService],
controllers:[
    AccountController,
    NotificationController,
    ProductController,
    InventoryController,
    OrderController,
    StoreController],
exports:[
    
]
})
export class UserModule{}