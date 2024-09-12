import { createZodDto } from 'nestjs-zod';

import { SchemaFileUpload } from 'shared-smilebaby/dist/contract/file.contract';

export class DtoFileUpload extends createZodDto(SchemaFileUpload) {}
