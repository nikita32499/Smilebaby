import { z } from 'zod';
import { Exactly, ZodSafe } from '../lib/zod';
import { TFileUpload, TFileUploadResponse } from '../types/file.types';

export const SchemaFileUploadResponse = ZodSafe(
    z.object({
        path: z.string(),
    }),
).infer<Exactly<TFileUploadResponse>>();

export const SchemaFileUpload = ZodSafe(
    z.object({
        filename: z.string(),
        mimetype: z.string(),
        data: z.instanceof(Buffer),
    }),
).infer<Exactly<TFileUpload>>();
