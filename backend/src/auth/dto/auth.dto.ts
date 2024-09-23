import { createZodDto } from 'nestjs-zod'
import { SchemaUserAuth } from 'shared-smilebaby'

export class DtoUserAuth extends createZodDto(SchemaUserAuth) {}
