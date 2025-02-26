import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { IsString ,IsOptional,IsNumber} from "class-validator";


export class CreateUserDto {
    username: string;
    password: string;
    role: string;
  }
  
export class usersignDto{
    @IsString()
    username:string;

    @IsString()
    password:string;
}
export class CreateInventoryDto{
    @IsString()
    stock_level:number
}

export class CreateOrderDto {
    storeId: number;
    productId: number;
    quantity: number;
  }
  
  export class UpdateInventoryDto {
    quantity: number;
  }
  export class CreateProductDto {
    name: string;
    uOMName: string;
    price: number;
    threshold: number;
  }
  export class CreateStoreDto {
    @ApiProperty({ description: 'Name of the store' })
    name: string;
  
    @ApiProperty({ description: 'Location of the store', required: false })
    location?: string;
  
    @ApiProperty({ description: 'Owner ID of the store' })
    ownerId: string;
  }
  
  export class UpdateStoreDto {
    @IsString()
    @IsOptional()
    name?: string;
  
    @IsString()
    @IsOptional()
    location?: string;
  }


  
  

  export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name?: string;
  
    @IsString()
    @IsOptional()
    uOMName?: string;
  
    @IsNumber()
    @IsOptional()
    price?: number;
  
    @IsNumber()
    @IsOptional()
    threshold?: number;
  }