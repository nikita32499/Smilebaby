// import { Updater, useImmer } from 'use-immer';

// export function useImmerState<T>(initialState: T): [T, Updater<T>, () => void] {
//     const [state, setState] = useImmer<T>(initialState);

//     const resetState = () => {
//         setState(initialState);
//     };

//     return [state, setState, resetState] as const;
// }

import { useState } from 'react';

type TSetState<T> = (data: (arg: T) => void) => void;

export function useImmerState<T>(initialState: T): [T, TSetState<T>, () => void] {
    const [state, setState] = useState<T>(initialState);

    const resetState = () => {
        setState(initialState);
    };

    const setImmer: TSetState<T> = (func) => {
        setState((prev) => {
            func(prev);
            return { ...prev };
        });
    };

    return [state, setImmer, resetState] as const;
}
