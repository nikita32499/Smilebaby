import { z } from 'zod';
import { Exactly, ZodSafe } from '../lib/zod';
import { IOrder, IOrderCreate, IOrderUpdate } from '../types/order.types';
import { SchemaItem } from './item.contract';
export const SchemaOrder = ZodSafe(
    z.object({
        id: z.number(),
        items: z.array(
            z.object({
                item: SchemaItem,
                size: z.string(),
                quantity: z.number(),
            }),
        ),
        phone: z.string(),
        name: z.string(),
        email: z.string().optional(),

        createdAt: z.number(),
    }),
).infer<Exactly<IOrder>>();

export const SchemaOrderArray = ZodSafe(SchemaOrder.array()).infer<Exactly<IOrder[]>>();

export const SchemaOrderCreate = ZodSafe(
    z.object({
        createData: SchemaOrder.omit({
            id: true,
            createdAt: true,
        }),
    }),
).infer<Exactly<IOrderCreate>>();

export const SchemaOrderUpdate = ZodSafe(
    z.object({
        id: SchemaOrder.shape.id,
        update: SchemaOrder.partial(),
    }),
).infer<Exactly<IOrderUpdate>>();