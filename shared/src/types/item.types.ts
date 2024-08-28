import { IEntriesBase } from './entries.types';

export type IItem = {
    id: number;
    name: string;
    descriptions: string;
    price: number;
    img_main: string;
    img_prev: string[];
    amount: { uuid: string; quantity: number; size: string }[];

    seasonId: number;
    season: IEntriesBase;

    countryId: number;
    country: IEntriesBase;

    sectionId: number;
    section: IEntriesBase;

    createdAt: number;

    lastAt: number;

    slug: string;
};

export type IItemUpsertData = Omit<
    IItem,
    'id' | 'lastAt' | 'createdAt' | 'section' | 'country' | 'season' | 'slug'
>;

export type IItemCreate = {
    createData: IItemUpsertData;
};
export type IItemUpdate = {
    update: IItemUpsertData;
    id: IItem['id'];
};
