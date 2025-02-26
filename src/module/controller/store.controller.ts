import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { StoreService } from '../service/store.service';
import { CreateStoreDto } from '../dto/dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/shared/authorization';


@ApiTags('stores')
@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}


  @Post('store-add-product')
  @UseGuards(JwtGuard)
  async createStore(@Body() createStoreDto: CreateStoreDto) {
    return await this.storeService.create(createStoreDto);
  }

  @Get(':id')
  async getStore(@Param('id') id: number) {
    return await this.storeService.findOne(id);
  }
}
