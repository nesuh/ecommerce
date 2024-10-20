import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { AllExceptionFilter } from './shared/exception/httpExceptionFilter';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({useClass:TypeOrmConfigService}),
    UserModule],
  controllers: [],
  providers: [
  {
    provide:'APP_FILTER',
    useClass:AllExceptionFilter,
  }
  ],
})
export class AppModule {}
