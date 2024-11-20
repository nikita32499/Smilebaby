'use client';
import { IItem } from 'shared-smilebaby';
import { cn } from 'shared/helpers/classnames';
import { ItemCard } from './ItemCard';

interface IPropsItemList {
    items: IItem[];
}

export const ItemList: FC<IPropsItemList> = (props) => {
    const { items } = props;

    return (
        <div
            className={cn(
                'grid  max-md:grid-cols-[repeat(2,1fr)] grid-cols-[repeat(5,1fr)] gap-[10px] auto-rows-[1fr]  max-md:gap-[2px]',
            )}
        >
            {items.map((item, index) => {
                return <ItemCard item={item} key={index} />;
            })}
        </div>
    );
};
