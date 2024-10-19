import { Repository,DeepPartial,ObjectLiteral, Column } from "typeorm";
import { Injectable , NotFoundException } from "@nestjs/common";
import { ExtraCrudOptions } from "../crud-option.type";
import { DataResponseFormat } from "../api-data/data-response-format";


@Injectable()
export class ExtraCrudService<T extends ObjectLiteral> {
    constructor(private readonly repository:Repository<T>){}


    async create(itemData: DeepPartial<any>,req?:any):Promise<any>{

        const item=this.repository.create(itemData);
        await this.repository.insert(item);
        return item
    }

    async findAll(
       extraCrudOptions:ExtraCrudOptions, 
       entityId:string,
       req?:any,
    ){
       
        const entityIdName=extraCrudOptions.entityIdName;

        const response=new DataResponseFormat<T>();
        return response;
    }

   async  findOne(id:any,req?:any):Promise<T | undefined> {
        return await this.repository.findOne({where:{id}})
    }

    async update(id:string,itemData:any):Promise<T | undefined>{
        await this.findOneOrFail(id);
        await this.repository.update(id,itemData);
        return this.findOne(id);
    }

    async delete(id:string, req?: any):Promise<void>{
        const item= await this.findOneOrFail(id);
         await this.repository.remove(item);
    }


    async restore(id:string,req?:any):Promise<void>{
        await this.findOneOrFailWithDeleted(id);
        await this.repository.restore(id)
    }


    private async findOneOrFail(id:any):Promise<T>  {
        const item = await this.findOne(id)
        if(!item){
            throw new NotFoundException('not_found');
        }
        return item;
    }

    private async findOneOrFailWithDeleted(id:any):Promise<T>{
        const item=await this.repository.findOne({
            where:{
                id,
            },
            withDeleted:true,
        });
        if(!item){
            throw new NotFoundException('not_found')
        }
        return item;
    }

}
