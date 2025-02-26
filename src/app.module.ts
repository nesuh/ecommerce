import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { EmailModule } from './module/email/email.module';
import { UserModule } from './module/user.module';
import { AuthorizationModule } from './shared/authorization';



@Module({
  imports: [
    AuthorizationModule,
    TypeOrmModule.forRootAsync({useClass:TypeOrmConfigService}),
     EmailModule,
     UserModule
  ],

})
export class AppModule {}
