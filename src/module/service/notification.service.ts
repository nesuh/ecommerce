import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from 'src/entity/notifications.entity';
import { Repository } from 'typeorm';


@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification) private notificationRepository: Repository<Notification>,
  ) {}

//   async create(message: string, storeId: number, productId: number): Promise<Notification> {
//     const notification = this.notificationRepository.create({ message, store: { id: storeId }, product: { id: productId } });
//     return await this.notificationRepository.save(notification);
//   }

  async markAsRead(id: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({ where: { 
      id:id.toString()
     } });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    notification.isRead = true;
    return await this.notificationRepository.save(notification);
  }

  async findUnread(): Promise<Notification[]> {
    return await this.notificationRepository.find({ where: { isRead: false } });
  }

  async getStoreNotifications(storeId: number): Promise<Notification[]> {
    return await this.notificationRepository.find({ where: { store: { id: storeId.toString()} } });
  }
}
