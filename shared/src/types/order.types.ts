import { PartialAndUndefined } from '../lib/utils';
import { IItem } from './item.types';

export type IOrder = {
    id: number;
    items: {
        item: IItem;
        size: string;
        quantity: number;
    }[];
    phone: string;
    name: string;
    email?: string | undefined;

    createdAt: number;
};

export type IOrderCreateData = Omit<IOrder, 'id' | 'createdAt'>;

export type IOrderCreate = {
    createData: IOrderCreateData;
};

export type IOrderUpdate = {
    update: PartialAndUndefined<IOrderCreateData>;
    id: IOrder['id'];
};
