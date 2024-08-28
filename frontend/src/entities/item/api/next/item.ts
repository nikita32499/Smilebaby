'server-only'
import { SchemaItem } from 'shared-smilebaby/dist/contract/item.contract'
import { IItem } from 'shared-smilebaby/dist/types/item.types'

export const nextGetAllItems = async (): Promise<IItem[]> => {
    const entries = await fetch(`${process.env['API_URL']!}/item/getAll`, {
        method: 'GET',
        next: {
            revalidate: 60,
        },
    })

    const data = await entries.json()

    return SchemaItem.array().parse(data)
}
