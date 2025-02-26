import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv'
import { TransformationInterceptor } from './shared/exception/responseinterceptor';
import { AllExceptionFilter } from './shared/exception/httpExceptionFilter';

dotenv.config({path:'.env'});
async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    {
      cors:true
    }
  );
app.useGlobalInterceptors(new TransformationInterceptor())
app.useGlobalFilters(new AllExceptionFilter(app.get(HttpAdapterHost)));

const port:number=Number(process.env.PORT) || 3000;



const customOptions:SwaggerCustomOptions={
  swaggerOptions:{
    docExpansion:'none'
  },
};

const document =SwaggerModule.createDocument(
  app,
  new DocumentBuilder()
  .setTitle('TEST API')
  .setDescription('TEST API')
  .addBearerAuth()
  .build(),
)
SwaggerModule.setup('docs',app,document,customOptions);
app.useGlobalPipes(
  new ValidationPipe({
    transform:true,
  }),
);


await app.listen(port , ()=>{
  console.log('[WEB]',process.env.BASE_URL +'/docs')
})

}
bootstrap();
