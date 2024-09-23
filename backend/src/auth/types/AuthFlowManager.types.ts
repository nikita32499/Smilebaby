import { IUser } from 'shared-smilebaby';

export interface IAuthFlowManager {
    authorization: (
        login: string,
        password: string,
    ) => Promise<null | {
        user: IUser;
        token: string;
    }>;
}
