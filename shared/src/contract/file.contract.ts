import { z } from 'zod'
import { Exactly, ZodSafe } from '../lib/zod'
import { TFileUploadResponse } from '../types/file.types'

export const SchemaFileUploadResponse = ZodSafe(
    z.object({
        path: z.string(),
    }),
).infer<Exactly<TFileUploadResponse>>()

export const SchemaFileUpload = z.object({
    filename: z.string(),
    mimetype: z.string(),
    data: z.instanceof(Buffer)
})