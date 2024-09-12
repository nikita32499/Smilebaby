import { PartialAndUndefined } from '../lib/utils';
import { IItem } from './item.types';

export type IOrder = {
    id: number;
    cart: IPurchaseBase[];
    phone: string;
    name: string;
    email?: string | undefined;

    createdAt: number;
};

export type IPurchaseBase = {
    item: IItem;

    size: IItem['amount'][number]['size'];
    quantity: IItem['amount'][number]['quantity'];
};

export type IOrderCreateData = Omit<IOrder, 'id' | 'createdAt'>;

export type IOrderCreate = {
    createData: IOrderCreateData;
};

export type IOrderUpdate = {
    update: PartialAndUndefined<IOrderCreateData>;
    id: IOrder['id'];
};
