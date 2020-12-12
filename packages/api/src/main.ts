import { NestFactory } from '@nestjs/core';
import { EntityNotFoundExceptionFilter } from 'filters/not-found-filter';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(morgan('tiny'));
    app.enableCors();
    app.useGlobalFilters(new EntityNotFoundExceptionFilter());
    await app.listen(3000);
}
bootstrap();
