import { createZodDto } from 'nestjs-zod';
import { SchemaUserAuth } from 'shared-smilebaby/dist/contract/user.contract';

export class DtoUserAuth extends createZodDto(SchemaUserAuth) {}
