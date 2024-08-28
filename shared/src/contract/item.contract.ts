import { z } from 'zod';
import { Exactly, ZodSafe } from '../lib/zod';
import { IItem, IItemCreate, IItemUpdate, IItemUpsertData } from '../types/item.types';
import { SchemaEntriesBase } from './entries.contract';
export const SchemaItem = ZodSafe(
    z.object({
        id: z.number(),
        name: z.string(),
        descriptions: z.string(),
        price: z.number(),
        img_main: z.string(),
        img_prev: z.array(z.string()),
        amount: z.array(
            z.object({ uuid: z.string(), quantity: z.number(), size: z.string() }),
        ),

        seasonId: z.number(),
        season: SchemaEntriesBase,

        countryId: z.number(),
        country: SchemaEntriesBase,

        sectionId: z.number(),
        section: SchemaEntriesBase,

        createdAt: z.number(),

        lastAt: z.number(),

        slug: z.string(),
    }),
).infer<Exactly<IItem>>();

export const SchemaItemArray = ZodSafe(SchemaItem.array()).infer<Exactly<IItem[]>>();

//CRUD

const SchemaItemUpsertData = ZodSafe(
    SchemaItem.omit({
        id: true,
        section: true,
        country: true,
        season: true,
        createdAt: true,
        lastAt: true,
        slug: true,
    }),
).infer<Exactly<IItemUpsertData>>();

export const SchemaItemCreate = ZodSafe(
    z.object({
        createData: SchemaItemUpsertData,
    }),
).infer<Exactly<IItemCreate>>();

export const SchemaItemUpdate = ZodSafe(
    z.object({
        id: SchemaItem.shape.id,
        update: SchemaItemUpsertData,
    }),
).infer<Exactly<IItemUpdate>>();
