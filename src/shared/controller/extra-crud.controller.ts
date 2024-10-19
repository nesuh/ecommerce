import { Body, Controller, Get, Param, Post,Query,Req } from "@nestjs/common";
import { ExtraCrudService } from "../service/extra-crud.service";
import { DeepPartial, ObjectLiteral } from "typeorm";
import { ExtraCrudOptions } from "../crud-option.type";
import { ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import { promises } from "dns";
import { DataResponseFormat } from "../api-data/data-response-format";

export class BaseAPIDto{}
export function ExtraCrudController<TEntity extends ObjectLiteral>(
    options: ExtraCrudOptions,
) {
    const { entityIdName, createDto, updateDto } = options;

    @Controller()
    @ApiBearerAuth()
    class ExtraCrudCntrollerHost {
        constructor(
            public readonly service: ExtraCrudService<TEntity>
        ) {}

        @Post()
        @ApiBody({ type: createDto || BaseAPIDto })
        async create(
            @Body() itemData: DeepPartial<TEntity>,
            @Req() req?: any,
        ): Promise<TEntity> {
            return this.service.create(itemData, req);
        }


        @Get('list/:id')
        async findAll(
            @Param('id') id:string,
            @Query('q') q:string,
            @Req() req?:any,
        ):Promise<DataResponseFormat<TEntity>>{
// const query= decodeCollectionQuery(q)
return 
        }

        @Get(':id')
async findOne(
    @Param('id') id:string,
    req?:any,
): Promise<TEntity | undefined> {
return this.service.findOne(id)
}







     
    }
    return ExtraCrudCntrollerHost;
}
