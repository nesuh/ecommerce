import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStoreDto, UpdateStoreDto } from '../dto/dto';
import { Store } from 'src/entity/store.entity';


@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store) private storeRepository: Repository<Store>,
  ) {}

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    const store = this.storeRepository.create(createStoreDto);
    return await this.storeRepository.save(store);
  }

  async update(id: number, updateStoreDto: UpdateStoreDto): Promise<Store> {
    await this.storeRepository.update(id, updateStoreDto);
    const updatedStore = await this.storeRepository.findOne(
        {
            where:{id:id.toString()}
        }
    );
    if (!updatedStore) {
      throw new NotFoundException('Store not found');
    }
    return updatedStore;
  }

  async findOne(id: number): Promise<Store> {
    const store = await this.storeRepository.findOne({
        where:{id:id.toString()}
    });
    if (!store) {
      throw new NotFoundException('Store not found');
    }
    return store;
  }
}
