import { z } from 'zod';

import { Exactly, ZodSafe } from '../lib/zod';
import {
    EnumViewNames,
    IViewCreateUnion,
    IViewUnion,
    IView__Articles,
    IView__HOME,
} from '../types/view-custom.types';
const SchemaView__HOME = ZodSafe(
    z.object({
        id: z.number(),
        name: z.literal(EnumViewNames.HOME),
        payload: z.object({
            slider: z.object({
                description: z.object({
                    text: z.string(),
                    object: z.object({
                        id: z.string(),
                        target: z.string(),
                        image: z.string(),
                    }),
                }),
                value: z.array(
                    z.object({
                        id: z.number(),
                        target: z.string(),
                        image: z.string(),
                    }),
                ),
            }),
        }),
        description: z.string(),
    }),
).infer<Exactly<IView__HOME>>();

const SchemaView__Articles = ZodSafe(
    z.object({
        id: z.number(),
        name: z.literal(EnumViewNames.ARTICLES),
        payload: z.object({
            description: z.object({
                text: z.string(),
                object: z.object({
                    id: z.string(),
                    title: z.string(),
                    description: z.string(),
                    h1: z.string(),
                    slug: z.string(),
                    content: z.string(),
                }),
            }),
            value: z.array(
                z.object({
                    id: z.number(),
                    title: z.string(),
                    description: z.string(),
                    h1: z.string(),
                    slug: z.string(),
                    content: z.string(),
                }),
            ),
        }),
        description: z.string(),
    }),
).infer<Exactly<IView__Articles>>();

export const SchemaViewUnion = ZodSafe(
    z.discriminatedUnion('name', [SchemaView__HOME, SchemaView__Articles]),
).infer<Exactly<IViewUnion>>();

export const SchemaViewUnionArray = ZodSafe(SchemaViewUnion.array()).infer<
    Exactly<IViewUnion[]>
>();

export const SchemaViewCreateUnion = ZodSafe(
    z.discriminatedUnion('name', [
        SchemaView__HOME.omit({ id: true }),
        SchemaView__Articles.omit({ id: true }),
    ]),
).infer<Exactly<IViewCreateUnion>>();
