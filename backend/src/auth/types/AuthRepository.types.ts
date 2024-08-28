import { IJwtUserData } from 'shared-smilebaby/dist/types/user.types';

export interface IAuthRepository {
    hashPassword: (password: string) => Promise<string>;
    createToken: (payload: IJwtUserData) => Promise<string>;
    validateToken: (token: string) => IJwtUserData | false;
}
