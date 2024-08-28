import { createZodDto } from 'nestjs-zod';
import {
    SchemaEntriesCreate,
    SchemaEntriesUpdate,
} from 'shared-smilebaby/dist/contract/entries.contract';

export class DtoEntriesUpdate extends createZodDto(SchemaEntriesUpdate) {}

export class DtoEntriesCreate extends createZodDto(SchemaEntriesCreate) {}
