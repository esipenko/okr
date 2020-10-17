import { NestFactory } from '@nestjs/core';
import { EntityNotFoundExceptionFilter } from 'filters/not-found-filter';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalFilters(new EntityNotFoundExceptionFilter());
    await app.listen(3000);
}
bootstrap();
