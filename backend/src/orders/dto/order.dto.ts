import { createZodDto } from 'nestjs-zod';
import {
    SchemaOrderCreate,
    SchemaOrderUpdate,
} from 'shared-smilebaby';

export class DtoOrderCreate extends createZodDto(SchemaOrderCreate) {}

export class DtoOrderUpdate extends createZodDto(SchemaOrderUpdate) {}
