import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesController } from './files.controller';
import { FileModel } from './files.model';
import { FilesService } from './files.service';

@Module({
    imports: [TypeOrmModule.forFeature([FileModel])],
    controllers: [FilesController],

    providers: [FilesService],
})
export class FilesModule {}
