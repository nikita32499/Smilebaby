'use client';
import { store } from 'app/_providers/store';
import { ItemApi, useFilterItem } from 'entities/item';
import { memo, useLayoutEffect } from 'react';
import { IEntriesSection, IItem } from 'shared-smilebaby';
import { useImagePreloader } from 'shared/hook/useImagePreloader';
import { Filter } from '../Filter/Filter';
import { ItemList } from '../Item/ItemList';
interface IStateStore {
    items: IItem[];
    currentSection: IEntriesSection | undefined;
}

export const StoreClient: FC<IStateStore> = memo(
    (props) => {
        const { currentSection, items } = props;

        const images = items.map((item) => [...item.img_main, ...item.img_prev]).flat();

        const imagesPreloaded = useImagePreloader(images);

        useLayoutEffect(() => {
            store.dispatch(ItemApi.endpoints.getAll.initiate());
            store.dispatch(
                ItemApi.util.updateQueryData('getAll', undefined, () => props.items),
            );
        }, []);

        const filteredItem = useFilterItem(items, currentSection);

        return (
            <div className='mt-[20px]'>
                <h1 className='text-black text-[28px] font-extrabold '>
                    {currentSection?.value ?? 'Все товары'}
                </h1>
                <div className='mt-[10px]'>
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
