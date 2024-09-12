'use client';
import { IItem } from 'shared-smilebaby/dist/types/item.types';
import { ItemCard } from './ItemCard';

interface IPropsItemList {
    items: IItem[];
}

export const ItemList: FC<IPropsItemList> = (props) => {
    const { items } = props;
    return (
        <div
            className='grid grid-cols-5 gap-[10px]'
            style={{ gridTemplateColumns: 'repeat(5,1fr)', gridAutoRows: '1fr' }}
        >
            {items.map((item, index) => {
                return <ItemCard item={item} key={index} />;
            })}
        </div>
    );
};
