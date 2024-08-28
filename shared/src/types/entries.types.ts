export enum EnumEntries {
    COUNTRY = 'COUNTRY',
    SECTION = 'SECTION',
    SEASON = 'SEASON',
}

export type IEntriesBase = {
    id: number;
    value: string;
    name: EnumEntries;
    data: object;
};

export interface IEntriesSection extends IEntriesBase {
    name: EnumEntries.SECTION;
    data: { img: string; slug: string };
}

export interface IEntriesRegular extends IEntriesBase {
    name: EnumEntries.COUNTRY | EnumEntries.SEASON;
    data: {};
}

export type IEntriesUnion = IEntriesSection | IEntriesRegular;

//CRUD

export type IEntriesUpsertData =
    | Omit<IEntriesSection, 'id'>
    | Omit<IEntriesRegular, 'id'>;

export type IEntriesCreate = {
    createData: IEntriesUpsertData;
};

export type IEntriesUpdate = {
    update: IEntriesUpsertData;
    id: IEntriesUnion['id'];
};
