import Cookies from 'js-cookie';
import { SchemaJwtUserData } from 'shared-smilebaby';
import { IJwtUserData } from 'shared-smilebaby';

export const getUserData = (): IJwtUserData | null => {
    const token = Cookies.get('authorization');
    if (!token) return null;

    const userData = token.split('.')?.[1];
    if (!userData) return null;

    return SchemaJwtUserData.parse(JSON.parse(atob(userData)));
};
