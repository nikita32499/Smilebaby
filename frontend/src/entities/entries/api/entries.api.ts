import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REACT_BASE_API_URL } from 'shared/config/constants';
import { SchemaResponseSuccess } from 'shared/contracts/response.contract';
import { ZodValidator } from 'shared/helpers/RTK-query';
import {
    SchemaEntriesArrayUnion,
    SchemaEntriesUnion,
} from 'shared-smilebaby';
import {
    IEntriesCreate,
    IEntriesUpdate,
} from 'shared-smilebaby';

import { z } from 'zod';

export const EntriesApi = createApi({
    reducerPath: 'EntriesApi',
    tagTypes: ['Entries'],
    baseQuery: fetchBaseQuery({
        baseUrl: REACT_BASE_API_URL + '/entries',
    }),

    endpoints: (builder) => ({
        getAll: builder.query<z.infer<typeof SchemaEntriesArrayUnion>, void>({
            query: () => '/getAll',

            providesTags: () => [{ type: 'Entries', id: 'LIST' }],
            transformResponse: (data) => ZodValidator(SchemaEntriesArrayUnion, data),
        }),
        create: builder.mutation<z.infer<typeof SchemaEntriesUnion>, IEntriesCreate>({
            query: (user) => ({
                url: `/create`,
                method: 'POST',
                body: user,
            }),
            invalidatesTags: () => [{ type: 'Entries', id: 'LIST' }],
            transformResponse: (data) => ZodValidator(SchemaEntriesUnion, data),
        }),
        update: builder.mutation<z.infer<typeof SchemaResponseSuccess>, IEntriesUpdate>({
            query: (data) => ({
                url: `/update`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: () => [{ type: 'Entries', id: 'LIST' }],
            transformResponse: (data) => ZodValidator(SchemaResponseSuccess, data),
        }),
        delete: builder.mutation<z.infer<typeof SchemaResponseSuccess>, number>({
            query: (id) => ({
                url: `/delete`,
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: () => [{ type: 'Entries', id: 'LIST' }],
            transformResponse: (data) => ZodValidator(SchemaResponseSuccess, data),
        }),
    }),
});
