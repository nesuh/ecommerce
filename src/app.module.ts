import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({useClass:TypeOrmConfigService}),
    UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
