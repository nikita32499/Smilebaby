import { IUser } from 'shared-smilebaby/dist/types/user.types';

export interface IAuthFlowManager {
    authorization: (
        login: string,
        password: string,
    ) => Promise<null | {
        user: IUser;
        token: string;
    }>;
}
