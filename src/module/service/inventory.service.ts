import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateInventoryDto } from '../dto/dto';
import { Inventory } from 'src/entity/Inventory.entity';


@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory) private inventoryRepository: Repository<Inventory>,
  ) {}

  async updateStock(id: number, updateInventoryDto: UpdateInventoryDto): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findOne({where:{
      id:id.toString()
    }});
    if (!inventory) {
      throw new NotFoundException('Inventory item not found');
    }
    inventory.stock_level += updateInventoryDto.quantity;
    return await this.inventoryRepository.save(inventory);
  }

  async findOne(id: number): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findOne({where:{
      id:id.toString()
    }});
    if (!inventory) {
      throw new NotFoundException('Inventory item not found');
    }
    return inventory;
  }
}
