// type TypeUserRole = 'admin' | 'user';

import { PartialAndUndefined } from '../lib/utils';

export enum UserRole {
    USER = 'user',
    MODERATOR = 'moderator',
    ADMIN = 'admin',
}

export type IUser = {
    id: number;
    login: string;
    password: string;
    role: UserRole;
    createdAt: number;
    lastAt: number | null;
};

export type IUserCreateData = Omit<IUser, 'id' | 'createdAt' | 'lastAt'>;

export type IUserCreate = {
    createData: IUserCreateData;
};

export type IUserUpdate = {
    update: PartialAndUndefined<IUserCreateData>;
    id: IUser['id'];
};

export type IJwtUserData = {
    userId: number;
};
