import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from 'shared-smilebaby';

interface IInitStateProfile {
    user: IUser | null;
}

const initialState: IInitStateProfile = {
    user: null,
};

export const profileSlice = createSlice({
    name: 'profileSlice',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
    },
});
