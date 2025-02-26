import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from '../dto/dto';
import { Product } from 'src/entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) 
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    await this.productRepository.update(id, updateProductDto);
    const updatedProduct = await this.productRepository.findOne({where:{id}});
    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }
    return updatedProduct;
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({where:{id}});
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
