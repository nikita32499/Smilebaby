import { createZodDto } from 'nestjs-zod';
import {
    SchemaUserCreate,
    SchemaUserUpdate,
} from 'shared-smilebaby';

export class DtoUserCreate extends createZodDto(SchemaUserCreate) {}

export class DtoUserUpdate extends createZodDto(SchemaUserUpdate) {}
