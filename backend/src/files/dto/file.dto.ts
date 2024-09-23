import { createZodDto } from 'nestjs-zod';

import { SchemaFileUpload } from 'shared-smilebaby';

export class DtoFileUpload extends createZodDto(SchemaFileUpload) {}
