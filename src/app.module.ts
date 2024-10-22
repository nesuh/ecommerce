import { Module } from '@nestjs/common';
// import { UserModule } from './module/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
// import { AllExceptionFilter } from './shared/exception/httpExceptionFilter';
// import { EmailController } from './module/email/email.controller';
// import { EmailService } from './module/email/email.service';
import { EmailModule } from './module/email/email.module';
// import { UserService } from './module/user/user.service';

@Module({
  imports: [
    // TypeOrmModule.forRootAsync({useClass:TypeOrmConfigService}),
    // UserModule,
    EmailModule,
  ],
  controllers: [],
  providers: [
  // {
  //   provide:'APP_FILTER',
  //   useClass:AllExceptionFilter,
  // }
  ],
})
export class AppModule {}
