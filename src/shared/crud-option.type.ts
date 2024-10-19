export type EntityCrudOptions={
    createDto?:{new (): NonNullable<unknown>};
    updateDto?:{new (): NonNullable<unknown>};
}

export type ExtraCrudOptions ={
    entityIdName:string;
     createDto?:{new (): NonNullable<unknown>};
     updateDto?:{new ():NonNullable<unknown>}
};


export interface RelatonCrudOptions {
    firstEntityIdName:string;
    firstInclude:string;
    secondEntityIdName:string ;
    secondInclude:string;
    assignFirstDto?:{new (): NonNullable<unknown>};
    assignSecondDto?:{new (): NonNullable<unknown>}
}