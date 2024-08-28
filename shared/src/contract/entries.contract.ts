import { z } from 'zod';

import { Exactly, ZodSafe } from '../lib/zod';
import {
    EnumEntries,
    IEntriesBase,
    IEntriesCreate,
    IEntriesRegular,
    IEntriesSection,
    IEntriesUnion,
    IEntriesUpdate,
    IEntriesUpsertData,
} from '../types/entries.types';

export const SchemaEntriesBase = ZodSafe(
    z.object({
        id: z.number(),
        name: z.nativeEnum(EnumEntries),
        data: z.object({}),
        value: z.string(),
    }),
).infer<Exactly<IEntriesBase>>();

const SchemaEntriesRegular = ZodSafe(
    SchemaEntriesBase.extend({
        name: z.enum([EnumEntries.SEASON, EnumEntries.COUNTRY]),
    }),
).infer<Exactly<IEntriesRegular>>();

const SchemaEntriesSection = ZodSafe(
    SchemaEntriesBase.extend({
        name: z.literal(EnumEntries.SECTION),
        data: z.object({
            img: z.string(),
            slug: z.string(),
        }),
    }),
).infer<Exactly<IEntriesSection>>();

export const SchemaEntriesUnion = ZodSafe(
    z.discriminatedUnion('name', [SchemaEntriesRegular, SchemaEntriesSection]),
).infer<Exactly<IEntriesUnion>>();

export const SchemaEntriesArrayUnion = ZodSafe(SchemaEntriesUnion.array()).infer<
    Exactly<IEntriesUnion[]>
>();

export const SchemaEntriesUnionArray = ZodSafe(SchemaEntriesUnion.array()).infer<
    Exactly<IEntriesUnion[]>
>();

//CRUD

const SchemaEntriesUpsertData = ZodSafe(
    z.discriminatedUnion('name', [
        SchemaEntriesRegular.omit({ id: true }),
        SchemaEntriesSection.omit({ id: true }),
    ]),
).infer<Exactly<IEntriesUpsertData>>();

export const SchemaEntriesCreate = ZodSafe(
    z.object({
        createData: SchemaEntriesUpsertData,
    }),
).infer<Exactly<IEntriesCreate>>();

export const SchemaEntriesUpdate = ZodSafe(
    z.object({
        id: SchemaEntriesBase.shape.id,
        update: SchemaEntriesUpsertData,
    }),
).infer<Exactly<IEntriesUpdate>>();
