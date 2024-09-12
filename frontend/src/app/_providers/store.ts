import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { EntriesApi } from 'entities/entries';
import { ItemApi, itemsSlice } from 'entities/item';
import { OrderApi } from 'entities/order/api/order.api';
import { profileSlice, UserApi } from 'entities/user/';
import { ViewApi } from 'entities/view/';

import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['profileSlice', 'itemsSlice'],
};

export const rootReducers = combineReducers({
    profileSlice: profileSlice.reducer,
    itemsSlice: itemsSlice.reducer,
    [ItemApi.reducerPath]: ItemApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [ViewApi.reducerPath]: ViewApi.reducer,
    [EntriesApi.reducerPath]: EntriesApi.reducer,
    [OrderApi.reducerPath]: OrderApi.reducer,
});
const persistedReducers = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat([
            UserApi.middleware,
            ViewApi.middleware,
            ItemApi.middleware,
            EntriesApi.middleware,
            OrderApi.middleware,
        ]),
});

export const persistor = persistStore(store);
