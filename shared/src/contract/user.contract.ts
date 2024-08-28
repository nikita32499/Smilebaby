import { z } from 'zod';
import { Exactly, ZodSafe } from '../lib/zod';
import {
    IJwtUserData,
    IUser,
    IUserCreate,
    IUserUpdate,
    UserRole,
} from '../types/user.types';

export const SchemaUser = ZodSafe(
    z.object({
        id: z.number(),
        login: z.string(),
        password: z.string(),
        role: z.nativeEnum(UserRole, { message: 'Укажите Права для пользователя' }),
        createdAt: z.number(),
        lastAt: z.union([z.number(), z.null()]),
    }),
).infer<Exactly<IUser>>();

export const SchemaUserArray = ZodSafe(SchemaUser.array()).infer<Exactly<IUser[]>>();

export const SchemaUserCreate = ZodSafe(
    z.object({
        createData: SchemaUser.omit({
            id: true,
            createdAt: true,
            lastAt: true,
        }).extend({
            login: z
                .string({
                    message: 'Укажите Логин',
                })
                .min(4, {
                    message: 'Логин должен быть больше 4 символов',
                })
                .max(30, {
                    message: 'Логин должен быть меньше 30 символов',
                }),
            password: z
                .string({
                    message: 'Укажите Пароль',
                })
                .min(10, {
                    message: 'Пароль должен быть больше 4 символов',
                })
                .max(50, {
                    message: 'Пароль должен быть меньше 50 символов',
                }),
        }),
    }),
).infer<Exactly<IUserCreate>>();

export const SchemaUserUpdate = ZodSafe(
    z.object({
        id: SchemaUser.shape.id,
        update: SchemaUser.partial(),
    }),
).infer<Exactly<IUserUpdate>>();

export const SchemaUserAuth = z.object({
    login: z.string(),
    password: z.string(),
});

export const SchemaJwtUserData = ZodSafe(
    z.object({
        userId: z.number(),
    }),
).infer<Exactly<IJwtUserData>>();

export const SchemaUserRole = ZodSafe(z.nativeEnum(UserRole)).infer<Exactly<UserRole>>();
