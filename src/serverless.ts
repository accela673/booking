import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Callback, Context, Handler } from 'aws-lambda';

let server: Handler

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Booking system')
    .setDescription(`Simple booking system for Ala-Too International University`)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  SwaggerModule.setup('swagger', app, document);
  ConfigModule.forRoot({envFilePath: ".env"})
  app.useGlobalPipes(new ValidationPipe())
  const PORT = process.env.PORT || 5000
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({app: expressApp})

}
export const handler: Handler =async (event: any, context: Context, callback: Callback) => {
    server = server ?? (await bootstrap())
    return server(event, context, callback)
}