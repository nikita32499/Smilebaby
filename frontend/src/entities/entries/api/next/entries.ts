import { IEntriesUnion, SchemaEntriesUnion } from 'shared-smilebaby';
import { NEST_API_URL } from 'shared/config/constants';

export const nextGetAllEntries = async (): Promise<IEntriesUnion[]> => {
    try {
        const entries = await fetch(`${NEST_API_URL}/entries/getAll`, {
            method: 'GET',
            next: {
                revalidate: 60,
            },
        });

        const data = await entries.json();

        return SchemaEntriesUnion.array().parse(data);
    } catch (error) {
        if (process.env['NODE_MODE']! === 'build') {
            return [];
        } else {
            throw error;
        }
    }
};
