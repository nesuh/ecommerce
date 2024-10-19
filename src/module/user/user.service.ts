import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { ExtraCrudService } from "src/shared/service/extra-crud.service";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserService extends ExtraCrudService<User>{

    constructor(

        @InjectRepository(User)
        private readonly repositoryUser:Repository<User>
        // private dataSource: DataSource,
    ){
        super(repositoryUser)
    }

}