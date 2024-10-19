    import { Audit } from './audit.entity';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
    Entity()
    export class User extends Audit{

    @PrimaryGeneratedColumn()
    id:string; 

    @Column()
    firstName:string;

    @Column()
    middleName:string;

    @Column()
    lastName:string;

    @Column()
    phone:string

    @Column()
    password:string;

    @Column()
    email:string;
    }
