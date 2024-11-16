import { IItem, SchemaItem } from 'shared-smilebaby';
import { NEST_API_URL } from 'shared/config/constants';

export const nextGetAllItems = async (): Promise<IItem[]> => {
    try {
        const entries = await fetch(`${NEST_API_URL}/item/getAll`, {
            method: 'GET',
            next: {
                revalidate: 60,
            },
        });

        const data = await entries.json();

        return SchemaItem.array().parse(data);
    } catch (error) {
        if (process.env['NODE_MODE']! === 'build') {
            return [];
        } else {
            throw error;
        }
    }
};
