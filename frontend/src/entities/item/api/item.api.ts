import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IItemCreate, IItemUpdate, SchemaItem, SchemaItemArray } from 'shared-smilebaby';
import { REACT_BASE_API_URL } from 'shared/config/constants';
import { ZodValidator } from 'shared/helpers/RTK-query';
import { SchemaResponseSuccess } from 'shared/schema/response.schema';

import { z } from 'zod';

export const ItemApi = createApi({
    reducerPath: 'ItemApi',
    tagTypes: ['Item'],
    baseQuery: fetchBaseQuery({
        baseUrl: REACT_BASE_API_URL + '/item',
    }),
    endpoints: (builder) => ({
        getAll: builder.query<z.infer<typeof SchemaItemArray>, void>({
            query: () => '/getAll',
            providesTags: () => [{ type: 'Item', id: 'LIST' }],
            transformResponse: (data) => ZodValidator(SchemaItemArray, data),
        }),
        create: builder.mutation<z.infer<typeof SchemaItem>, IItemCreate>({
            query: (user) => ({
                url: `/create`,
                method: 'POST',
                body: user,
            }),
            invalidatesTags: () => [{ type: 'Item', id: 'LIST' }],
            transformResponse: (data) => ZodValidator(SchemaItem, data),
        }),
        update: builder.mutation<z.infer<typeof SchemaResponseSuccess>, IItemUpdate>({
            query: (dataUpdate) => ({
                url: `/update`,
                method: 'POST',
                body: dataUpdate,
            }),
            invalidatesTags: () => [{ type: 'Item', id: 'LIST' }],
            transformResponse: (data) => ZodValidator(SchemaResponseSuccess, data),
        }),
        delete: builder.mutation<z.infer<typeof SchemaResponseSuccess>, number>({
            query: (id) => ({
                url: `/delete`,
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: () => [{ type: 'Item', id: 'LIST' }],
            transformResponse: (data) => ZodValidator(SchemaResponseSuccess, data),
        }),
    }),
});
