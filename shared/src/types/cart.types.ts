import { IItem } from './item.types';

export type ICart = {
    items: IItem[];
    ownerId: number;

    createdAt: number;
};
