import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dto/dto';
import { Order } from 'src/entity/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return await this.orderRepository.save(order);
  }

  async updateStatus(id: number, status: string): Promise<Order> {
    const order = await this.orderRepository.findOne({where:{
      id:id.toString()
    }});
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.status = status;
    return await this.orderRepository.save(order);
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({where:{id:id.toString()}});
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
}
