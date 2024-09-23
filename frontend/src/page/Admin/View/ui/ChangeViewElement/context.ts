import { createContext } from 'react';
import { IViewUnion } from 'shared-smilebaby';

export interface IPropsChangeViewElement {
    view: IViewUnion;
    flow: {
        goBack: () => void;
    };
    rerender: () => void;
}

const ContextChangeViewElement = createContext<IPropsChangeViewElement>(null!);

export { ContextChangeViewElement };
