import { EnumViewNames } from './view-custom.types';

export function isView(data: unknown): data is IView {
    return (
        typeof data === 'object' &&
        data != null &&
        'id' in data &&
        'name' in data &&
        'payload' in data
    );
}
export type ICreateView = Omit<IView, 'id'>;

export type IView = {
    id: number;
    name: EnumViewNames;
    payload: object;
    description: string;
};
export type TViewAttrValue<Value> = {
    description: Value extends Array<infer El> ? IViewAttrExtend<El> : string;
    value: Value extends Array<infer El>
        ? El extends { id: number }
            ? Value
            : never
        : Value;
};

export type IViewAttrExtend<Value> = {
    text: string;
    object: {
        [K in keyof Value]: string;
    };
};
