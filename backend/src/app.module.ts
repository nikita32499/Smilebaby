import { Module } from '@nestjs/common';
import { UsersModule } from './user/users.module';

import { UserModel } from './user/users.model';

import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from './_guards/JwtAccess.guard';
import { EntriesModel } from './entries/entries.model';
import { EntriesModule } from './entries/entries.module';
import { FilesModule } from './files/files.module';
import { ItemModel } from './items/items.model';
import { ItemsModule } from './items/items.module';
import { OrderModel } from './orders/order.model';
import { OrdersModule } from './orders/orders.module';
import { ViewModel } from './view/view.model';
import { ViewModule } from './view/view.module';

import { AuthModule } from './auth/auth.module';

import dotenv from 'dotenv';
import { FileModel } from 'files/files.model';

dotenv.config();

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env['POSTGRES_HOST']!,
            port: Number(process.env['POSTGRES_PORT']!),
            username: process.env['POSTGRES_USER']!,
            password: process.env['POSTGRES_PASSWORD']!,
            database: process.env['POSTGRES_DATABASE']!,
            entities: [
                UserModel,
                ViewModel,
                ItemModel,
                EntriesModel,
                OrderModel,
                FileModel,
            ],
            autoLoadEntities: true,
            synchronize: true,
        }),
        UsersModule,
        ViewModule,
        ItemsModule,
        OrdersModule,
        EntriesModule,
        FilesModule,
        AuthModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule {}
