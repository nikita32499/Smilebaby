import cn from 'classnames';
import { getFinallyCount } from 'entities/item/helper/cart';
import { IItem } from 'shared-smilebaby';
import { useActions, useAppSelector } from 'shared/hook/redux-hooks';
import { CustomLink } from 'shared/ui/CustomLink';
interface IPropsSidePanel {
    item: IItem;
}

export const SidePanel: FC<IPropsSidePanel> = (props) => {
    const { item } = props;
    const purchaseList = useAppSelector((store) => store.itemsSlice.cart);

    const { upsertPurchase, deletePurchase } = useActions();

    const cart = useAppSelector((store) => store.itemsSlice.cart);

    const finallyCount = getFinallyCount(cart);

    const itPurchase = (size: string) =>
        purchaseList.some(
            (purchase) => purchase.item.id === item.id && purchase.size === size,
        );

    const toggleSizeHandler = (size: string) => {
        const existItem = itPurchase(size);

        if (existItem) {
            deletePurchase({
                item,
                size,
            });
        } else {
            upsertPurchase({
                item,
                size,
                quantity: 1,
                avail: true,
            });
        }
    };

    return (
        <div className='flex flex-col max-w-[288px]'>
            <span className='text-[24px] w-full'>{item.name}</span>
            <span className='text-[#888] text-[16px] mt-[7px]'>{item.section.value}</span>
            <span className='text-[16px] mt-[7px]'>{item.price} ₽</span>

            <div className='mt-[80px]'>
                <span className='text-[16px]'>Размер</span>
                <div className='grid grid-cols-4 gap-[8px] w-max'>
                    {item.amount.map((amount) => {
                        return (
                            <button
                                className={cn(
                                    'w-[64px] h-[48px] rounded-[4px]',
                                    itPurchase(amount.size)
                                        ? 'bg-black text-white border-0'
                                        : 'border-[1px] border-[#E5E5E5]',
                                )}
                                onClick={() => {
                                    toggleSizeHandler(amount.size);
                                }}
                            >
                                {amount.size}
                            </button>
                        );
                    })}
                </div>
            </div>
            <CustomLink
                href={'/cart'}
                className={cn(
                    'h-[54px]  rounded-[4px] w-full  mt-auto flex justify-center items-center',
                    finallyCount > 0
                        ? 'bg-black text-white'
                        : 'bg-[#c7c7c7] text-[#9f9f9f]',
                )}
            >
                Перейти в корзину
            </CustomLink>
        </div>
    );
};
