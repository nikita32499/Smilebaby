'use client';
import { store } from 'app/_providers/store';
import { ItemApi, useFilterItem } from 'entities/item';
import { memo, useLayoutEffect } from 'react';
import { IEntriesSection } from 'shared-smilebaby/dist/types/entries.types';
import { IItem } from 'shared-smilebaby/dist/types/item.types';
import { Filter } from '../Filter/Filter';
import { ItemList } from '../Item/ItemList';
interface IStateStore {
    items: IItem[];
    currentSection: IEntriesSection | undefined;
}

export const StoreClient: FC<IStateStore> = memo(
    (props) => {
        const { currentSection, items } = props;

        useLayoutEffect(() => {
            store.dispatch(ItemApi.endpoints.getAll.initiate());
            store.dispatch(
                ItemApi.util.updateQueryData('getAll', undefined, () => props.items),
            );
        }, []);

        const filteredItem = useFilterItem(items, currentSection);

        return (
            <div className='my-[24px]'>
                <h1 className='text-black text-[28px] font-extrabold '>
                    {currentSection?.value ?? 'Все товары'}
                </h1>
                <div>
                    <Filter items={props.items} />
                    <div className='mt-[15px]'>
                        <ItemList items={filteredItem} />
                    </div>
                </div>
            </div>
        );
    },
    () => false,
);
