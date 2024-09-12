import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TFileUpload } from 'shared-smilebaby/dist/types/file.types';
import { Repository } from 'typeorm';
import { FileModel } from './files.model';

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(FileModel)
        private readonly File: Repository<FileModel>,
    ) {}

    async uploadFile(uploadFileDto: TFileUpload) {
        return this.File.save(uploadFileDto);
    }

    async getFile(filename: string) {
        return this.File.findOne({ where: { filename } });
    }
}
