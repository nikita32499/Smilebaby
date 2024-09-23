import {
    EnumViewNames,
    IViewCreateUnion,
} from 'shared-smilebaby';
import { IView } from 'shared-smilebaby';
export interface IViewRepository {
    saveView: (createData: IViewCreateUnion) => Promise<IView | null>;
    getView: (name: EnumViewNames) => Promise<IView | null>;
    getAll: () => Promise<IView[]>;
}
