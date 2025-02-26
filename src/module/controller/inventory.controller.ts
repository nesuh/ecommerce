import { Controller, Patch, Body, Param } from '@nestjs/common';
import { InventoryService } from '../service/inventory.service';
import { UpdateInventoryDto } from '../dto/dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Patch(':id')
  async updateInventory(@Param('id') id: number, @Body() updateInventoryDto: UpdateInventoryDto) {
    return await this.inventoryService.updateStock(id, updateInventoryDto);
  }
}
