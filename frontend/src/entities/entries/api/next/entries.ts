 
import { IEntriesUnion, SchemaEntriesUnion } from 'shared-smilebaby'

export const nextGetAllEntries = async (): Promise<IEntriesUnion[]> => {
    const entries = await fetch(`${process.env['API_URL']}/entries/getAll`, {
        method: 'GET',
    });

    const data = await entries.json();

    return SchemaEntriesUnion.array().parse(data);
};
