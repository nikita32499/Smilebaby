import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    IOrderCreate,
    IOrderUpdate,
    SchemaOrder,
    SchemaOrderArray,
} from 'shared-smilebaby';
import { REACT_BASE_API_URL } from 'shared/config/constants';
import { SchemaResponseSuccess } from 'shared/contracts/response.contract';
import { ZodValidator } from 'shared/helpers/RTK-query';
import { z } from 'zod';

export const OrderApi = createApi({
    reducerPath: 'OrderApi',
    tagTypes: ['Order'],
    baseQuery: fetchBaseQuery({
        baseUrl: REACT_BASE_API_URL + '/order',
    }),

    endpoints: (builder) => ({
        getAll: builder.query<z.infer<typeof SchemaOrderArray>, void>({
            query: () => '/getAll',

            providesTags: () => [{ type: 'Order', id: 'LIST' }],
            transformResponse: (data) => ZodValidator(SchemaOrderArray, data),
        }),
        create: builder.mutation<z.infer<typeof SchemaOrder>, IOrderCreate>({
            query: (user) => ({
                url: `/create`,
                method: 'POST',
                body: user,
            }),
            invalidatesTags: () => [{ type: 'Order', id: 'LIST' }],
            transformResponse: (data) => ZodValidator(SchemaOrder, data),
        }),
        update: builder.mutation<z.infer<typeof SchemaResponseSuccess>, IOrderUpdate>({
            query: (data) => ({
                url: `/update`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: () => [{ type: 'Order', id: 'LIST' }],
            transformResponse: (data) => ZodValidator(SchemaResponseSuccess, data),
        }),
        delete: builder.mutation<z.infer<typeof SchemaResponseSuccess>, number>({
            query: (id) => ({
                url: `/delete`,
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: () => [{ type: 'Order', id: 'LIST' }],
            transformResponse: (data) => ZodValidator(SchemaResponseSuccess, data),
        }),
    }),
});
