import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  BigInt.prototype['toJSON'] = function () {
    return parseInt(this.toString());
  };
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder().setBasePath('api').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
