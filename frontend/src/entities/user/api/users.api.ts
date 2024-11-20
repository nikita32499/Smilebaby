import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUserCreate, SchemaUser, SchemaUserArray } from 'shared-smilebaby';
import { REACT_BASE_API_URL } from 'shared/config/constants';
import { ZodValidator } from 'shared/helpers/RTK-query';
import { SchemaResponseSuccess } from 'shared/schema/response.schema';
import { z } from 'zod';

export const UserApi = createApi({
    reducerPath: 'UsersApi',
    tagTypes: ['Users'],
    baseQuery: fetchBaseQuery({
        baseUrl: REACT_BASE_API_URL,
    }),
    endpoints: (builder) => ({
        login: builder.mutation<
            z.infer<typeof SchemaUser>,
            { login: string; password: string }
        >({
            query: (data) => ({
                url: `/auth/login`,
                method: 'POST',
                body: data,
            }),
            transformResponse: (data) => ZodValidator(SchemaUser, data),
        }),

        getAll: builder.query<z.infer<typeof SchemaUserArray>, void>({
            query: () => `/user/getAll`,
            providesTags: () => [{ type: 'Users', id: 'LIST' }],
            transformResponse: (data) => ZodValidator(SchemaUserArray, data),
        }),
        create: builder.mutation<z.infer<typeof SchemaUser>, IUserCreate>({
            query: (user) => ({
                url: `/user/create`,
                method: 'POST',
                body: user,
            }),
            invalidatesTags: () => [{ type: 'Users', id: 'LIST' }],
            transformResponse: (data) => ZodValidator(SchemaUser, data),
        }),
        delete: builder.mutation<z.infer<typeof SchemaResponseSuccess>, number>({
            query: (id) => ({
                url: `/user/delete`,
                method: 'DELETE',
                body: {
                    id,
                },
            }),
            invalidatesTags: () => [{ type: 'Users', id: 'LIST' }],
            transformResponse: (data) => ZodValidator(SchemaResponseSuccess, data),
        }),
        update: builder.mutation<
            z.infer<typeof SchemaResponseSuccess>,
            { id: number; data: Partial<IUserCreate> }
        >({
            query: ({ id, data }) => ({
                url: '/user/update',
                method: 'POST',
                body: {
                    id,
                    data,
                },
            }),
            invalidatesTags: () => [{ type: 'Users', id: 'LIST' }],
            transformResponse: (data) => ZodValidator(SchemaResponseSuccess, data),
        }),
    }),
});
