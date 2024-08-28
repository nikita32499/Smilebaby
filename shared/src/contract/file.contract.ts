import { z } from 'zod';
import { Exactly, ZodSafe } from '../lib/zod';
import { IFileCreate } from '../types/file.types';

export const SchemaFileCreate = ZodSafe(
    z.object({
        path: z.string(),
    }),
).infer<Exactly<IFileCreate>>();
