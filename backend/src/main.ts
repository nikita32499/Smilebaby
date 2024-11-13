import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
import { ZodValidationPipe } from 'nestjs-zod';
import { z } from 'zod';

dotenv.config();

z.object({
    JWT_SECRET_KEY: z.string(),
    ACCESS_TOKEN: z.string(),
    POSTGRES_HOST: z.string(),
    POSTGRES_PORT: z.number(),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DATABASE: z.string(),
}).parse({
    ...process.env,
    POSTGRES_PORT: parseInt(process.env['POSTGRES_PORT']!),
});

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('/api');

    app.use(cookieParser());

    app.useGlobalPipes(new ZodValidationPipe());

    await app.listen(3001);
}

bootstrap();

console.log('dddd');
