import { createZodDto } from 'nestjs-zod';
import {
    SchemaItemCreate,
    SchemaItemUpdate,
} from 'shared-smilebaby';

export class DtoItemCreate extends createZodDto(SchemaItemCreate) {}

export class DtoItemUpdate extends createZodDto(SchemaItemUpdate) {}
