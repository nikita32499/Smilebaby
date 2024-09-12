'server-only';
import { SchemaEntriesUnion } from 'shared-smilebaby/dist/contract/entries.contract';
import { IEntriesUnion } from 'shared-smilebaby/dist/types/entries.types';

export const nextGetAllEntries = async (): Promise<IEntriesUnion[]> => {
    const entries = await fetch(`${process.env['API_URL']!}/entries/getAll`, {
        method: 'GET',
    });

    const data = await entries.json();

    return SchemaEntriesUnion.array().parse(data);
};
