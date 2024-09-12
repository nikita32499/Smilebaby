import { createContext } from 'react';

export interface IStateCartClient {
    flow: {
        state: 'cart' | 'form';
    };
}

interface IContextCart {
    setState: (updater: (draft: IStateCartClient) => void) => void;
}

export const CartContext = createContext<IContextCart>(null!);
