import {
    IUser,
    IUserCreate,
    IUserUpdate,
    UserRole,
} from 'shared-smilebaby';

export interface IUserRepository {
    getAll: () => Promise<IUser[]>;
    getById: (id: number) => Promise<IUser | null>;
    getByLogin: (login: string) => Promise<IUser | null>;
    create: (createData: IUserCreate) => Promise<IUser>;
    update: (updateData: IUserUpdate) => Promise<boolean>;
    updateLastAt: (id: number) => Promise<void>;
    delete: (id: number) => Promise<boolean>;

    resolveRoleByUserId: (userId: number) => UserRole | null;
}
