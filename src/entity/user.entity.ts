    import { userTypes } from 'src/shared/enums/user.enum';
import { Audit } from './audit.entity';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
    Entity()
    export class User extends Audit{

    @PrimaryGeneratedColumn()
    id:string; 

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column({enum:[userTypes.ADMIN,userTypes.CUSTOMER]})
    type:string

    @Column({default:false})
    isVerified:boolean;

    @Column()
    otp:number;  
    
    @Column({default:null})
    otpExpiryTime:Date;
    }
