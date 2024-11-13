import { IEntriesUnion, SchemaEntriesUnion } from 'shared-smilebaby';
import { NEST_API_URL } from 'shared/config/constants';

export const nextGetAllEntries = async (): Promise<IEntriesUnion[]> => {
    if (process.env['NODE_MODE']! === 'build') return [];
    const entries = await fetch(`${NEST_API_URL}/entries/getAll`, {
        method: 'GET',
    });

    const data = await entries.json();

    return SchemaEntriesUnion.array().parse(data);
};
