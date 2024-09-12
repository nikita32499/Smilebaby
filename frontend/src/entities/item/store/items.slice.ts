'use client';

import lodash from 'lodash';

import { IPurchaseBase } from 'shared-smilebaby';

export interface IPurchase extends IPurchaseBase {
    avail: boolean;
}

interface IInitStateItems {
    meta: {
        absoluteMaxPrice: number;
        absoluteMinPrice: number;
    };
    filter: {
        sort: 'default' | 'by price+' | 'by price-';
        price: { min: number; max: number };
        country: string[];
        size: string[];
        season: string[];
        modified: boolean;
    };
    cart: IPurchase[];
}

const initialState: IInitStateItems = {
    meta: {
        absoluteMaxPrice: 9999999,
        absoluteMinPrice: 0,
    },
    filter: {
        sort: 'default',
        price: { max: 9999999, min: 0 },
        country: [],
        size: [],
        season: [],
        modified: false,
    },
    cart: [],
} as const;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mergeAndRemoveDuplicates } from 'shared/helpers/object';
import { ItemApi } from '../api/item.api';
import { findPurchase } from '../helper/cart';
type DiscriminatedUnion<T> = {
    [K in keyof T]: { key: K; value: T[K] extends Array<infer U> ? U : T[K] };
}[keyof T];

type ISetFilter = DiscriminatedUnion<IInitStateItems['filter']>;

type TActionDelete = Pick<IInitStateItems['cart'][number], 'size' | 'item'>;

export const itemsSlice = createSlice({
    name: 'itemsSlice',
    initialState,
    reducers: {
        toggleAvailForEveryPurchase: (state, action: PayloadAction<void>) => {
            const selectAllState = state.cart.every((purchase) => purchase.avail);

            state.cart = state.cart.map((purchase) => {
                if (!selectAllState) {
                    purchase.avail = true;
                } else {
                    purchase.avail = !purchase.avail;
                }

                return purchase;
            });
        },

        deletePurchase: (state, action: PayloadAction<TActionDelete>) => {
            let existItem = findPurchase(
                state.cart,
                action.payload.item.id,
                action.payload.size,
            );
            if (existItem) {
                state.cart = state.cart.filter((purchase) => purchase !== existItem);
            }
        },

        upsertPurchase: (
            state,
            action: PayloadAction<IInitStateItems['cart'][number]>,
        ) => {
            if (action.payload.quantity < 1) {
                action.payload.quantity = 1;
            }

            const currentAmount = action.payload.item.amount.find(
                (amount) => amount.size === action.payload.size,
            );
            if (!currentAmount) {
                return;
            }
            if (action.payload.quantity > currentAmount.quantity) {
                action.payload.quantity = currentAmount.quantity;
            }
            let existItem = findPurchase(
                state.cart,
                action.payload.item.id,
                action.payload.size,
            );
            if (existItem) {
                state.cart = state.cart.map((item) =>
                    item === existItem ? action.payload : item,
                );
            } else {
                state.cart.push(action.payload);
            }
        },

        // removeFromCart: (
        //     state,
        //     action: PayloadAction<IInitStateItems['cart'][number]>,
        // ) => {
        //     const existItem = findPurchase(
        //         state.cart,
        //         action.payload.item.id,
        //         action.payload.size,
        //     );
        //     if (existItem) {
        //         if (existItem.quantity - action.payload.quantity >= 1) {
        //             existItem.quantity -= action.payload.quantity;
        //         } else {
        //             state.cart = state.cart.filter((purchase) => purchase !== existItem);
        //         }
        //     }
        // },
        setFilter: (state, action: PayloadAction<ISetFilter[]>) => {
            for (const option of action.payload) {
                if (
                    'size' === option.key ||
                    'country' === option.key ||
                    'season' === option.key
                ) {
                    state.filter[option.key] = mergeAndRemoveDuplicates(
                        state.filter[option.key],
                        [option.value],
                    );
                } else if ('sort' === option.key) {
                    state.filter[option.key] = option.value;
                } else if ('price' === option.key) {
                    if (option.value.min >= option.value.max) {
                        return;
                    }
                    state.filter[option.key] = {
                        ...state.filter[option.key],
                        ...option.value,
                    };
                }
            }

            if (
                lodash.isEqual({ ...state.filter, modified: false }, initialState.filter)
            ) {
                state.filter.modified = false;
            } else {
                state.filter.modified = true;
            }
        },
        resetFilter: (state, action: PayloadAction<void>) => {
            state.filter = initialState.filter;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(ItemApi.endpoints.getAll.matchFulfilled, (state, action) => {
            state.meta = {
                ...state.meta,
                absoluteMaxPrice: action.payload.reduce(
                    (max, { price }) => (max < price ? price : max),
                    0,
                ),
                absoluteMinPrice: action.payload.reduce(
                    (min, { price }) => (min > price ? price : min),
                    ('0' in action.payload && action.payload[0].price) || 0,
                ),
            };
        });
    },
});
