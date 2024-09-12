import {
    BadRequestException,
    Controller,
    Get,
    Param,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';

import { Roles } from '_decorators/Roles';
import { createSlug } from '_helpers/slug';
import { Response } from 'express';
import { TFileUploadResponse } from 'shared-smilebaby/dist/types/file.types';
import { UserRole } from 'shared-smilebaby/dist/types/user.types';

@Controller()
export class FilesController {
    constructor(private readonly fileService: FilesService) {}

    @Roles(UserRole.ADMIN, UserRole.MODERATOR)
    @Post('/files/uploadOne')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('укажите фаил');
        }
        const uploadFileDto = {
            filename: createSlug(`${Date.now()} ${file.originalname}`),
            mimetype: file.mimetype,
            data: file.buffer,
        };
        const result = await this.fileService.uploadFile(uploadFileDto);
        return { path: `/api/static/${result.filename}` } satisfies TFileUploadResponse;
    }

    @Roles('public')
    @Get('/static/:filename')
    async getFile(
        @Param('filename') filename: string,
        @Res() res: Response,
    ): Promise<void> {
        const file = await this.fileService.getFile(filename);

        if (!file) {
            res.status(404).send('File not found');
            return;
        }

        res.set({
            'Content-Type': file.mimetype,
            'Content-Disposition': `attachment; filename="${file.filename}"`,
        });
        res.send(file.data);
    }
}
