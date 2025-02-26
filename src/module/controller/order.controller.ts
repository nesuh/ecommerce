import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { CreateOrderDto } from '../dto/dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async placeOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  @Get(':id')
  async getOrder(@Param('id') id: number) {
    return await this.orderService.findOne(id);
  }
}
