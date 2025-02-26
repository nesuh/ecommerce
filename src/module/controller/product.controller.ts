import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { CreateProductDto } from '../dto/dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Product } from 'src/entity/product.entity';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


  @Post('add-product')
  @ApiBody({ type:CreateProductDto  })
  async createProduct(@Body() createProductDto: CreateProductDto):Promise<Product> {
    return await this.productService.create(createProductDto);
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }
}
