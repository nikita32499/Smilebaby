import { createZodDto } from 'nestjs-zod';
import {
    SchemaEntriesCreate,
    SchemaEntriesUpdate,
} from 'shared-smilebaby';

export class DtoEntriesUpdate extends createZodDto(SchemaEntriesUpdate) {}

export class DtoEntriesCreate extends createZodDto(SchemaEntriesCreate) {}
