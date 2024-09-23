 

import { SchemaJwtUserData } from 'shared-smilebaby';
import { IJwtUserData } from 'shared-smilebaby';

export const validateToken = async (token: string): Promise<IJwtUserData | false> => {
    const response = await fetch(`${process.env['API_URL']}/auth/validateToken`, {
        cache: 'no-store',
        method: 'POST',
        body: JSON.stringify({
            token,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        return false;
    }
    const jwtData = await response.json();
    if (jwtData === false) return false;
    return SchemaJwtUserData.parse(jwtData);
};
