import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Catch, BadRequestException, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import * as express from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter<BadRequestException> {
  public catch (exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse() as express.Response
    response
      .status(422)
      .json({
        statusCode: 422,
        error: `Unprocessable Entity`,
        message: exception.message.message,
      })
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ValidationExceptionFilter());
  await app.listen(3002, () => console.log("App listening on PORT 3002"));
}
bootstrap();
