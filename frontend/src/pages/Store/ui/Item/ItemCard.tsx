import { IItem } from 'shared-smilebaby/dist/types/item.types';
import { CustomLink } from 'shared/ui/CustomLink';
import { Slider } from './Slider';
interface IPropsItemCard {
    item: IItem;
}

export const ItemCard: FC<IPropsItemCard> = (props) => {
    const { item } = props;
    return (
        <CustomLink
            href={`/product/${item.id}`}
            className='group flex flex-col hover:shadow-md hover:card-box-on-focus'
        >
            <Slider item={item} />
            <span className='mt-[14px] text-[18px] font-bold'>{item.price} ₽</span>
            <span className='mt-[14px]  text-[16px] font-light h-[48px]'>
                {item.name}
            </span>
            <span className='text-[14px] font-light text-[#888888] hidden  group-hover:block'>
                Размеры:{' '}
                {item.amount
                    .map((amount) => {
                        return amount.size;
                    })
                    .join(', ')}
            </span>
            <span className='block opacity-0  group-hover:hidden group-hover:card-box-on-focus'>
                !<br />!
            </span>
        </CustomLink>
    );
};
