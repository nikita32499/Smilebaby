/* кастомные интерфейсы страниц */

import { IView, TViewAttrValue } from './view.types';

export enum EnumViewNames {
    HOME = 'HOME',
    ARTICLES = 'ARTICLES',
}

export type IView__HOME = IView & {
    name: EnumViewNames.HOME;
    payload: {
        slider: TViewAttrValue<{ id: number; target: string; image: string }[]>;
    };
};

export type IView__Articles = IView & {
    name: EnumViewNames.ARTICLES;
    payload: TViewAttrValue<
        {
            id: number;
            title: string;
            description: string;
            h1: string;
            slug: string;
            content: string;
        }[]
    >;
};

export type IViewUnion = IView__HOME | IView__Articles;

export type IViewCreateUnion = Omit<IView__HOME, 'id'> | Omit<IView__Articles, 'id'>;
