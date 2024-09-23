 

import { SchemaUser } from 'shared-smilebaby'
import { IUser } from 'shared-smilebaby'

export const getUser = async (id: number): Promise<IUser | null> => {
    const response = await fetch(`${process.env['API_URL']}/user/getById/${id}`, {
        cache: 'no-store',
        headers:{
            "access-token":process.env['ACCESS_TOKEN'] || ""
        }
    });
    if (!response.ok) {
        return null;
    }
    const user = await response.json();

    if (user === false) return null;

    return SchemaUser.parse(user);
};
