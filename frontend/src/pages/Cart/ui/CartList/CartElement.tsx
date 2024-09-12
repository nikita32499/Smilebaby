import { IPurchase } from 'entities/item/store/items.slice';
import { useActions } from 'shared/hook/redux-hooks';
import { GalkaButton } from 'shared/ui/GalkaButton';

interface IPropsCartElement {
    purchase: IPurchase;
}

export const CartElement: FC<IPropsCartElement> = (props) => {
    const { purchase } = props;

    const item = purchase.item;

    const { upsertPurchase, deletePurchase } = useActions();

    const toggleAvailPurchase = () => {
        upsertPurchase({
            ...purchase,
            avail: !purchase.avail,
        });
    };

    const deletePurchaseHandler = () => {
        deletePurchase(purchase);
    };

    const decrimentCount = () => {
        upsertPurchase({
            ...purchase,
            quantity: purchase.quantity - 1,
        });
    };

    const incrimentCount = () => {
        upsertPurchase({
            ...purchase,
            quantity: purchase.quantity + 1,
        });
    };

    const maxQuantity =
        purchase.item.amount.find((amount) => amount.size === purchase.size)?.quantity ??
        0;

    return (
        <div
            className='grid max-w-[600px] py-[15px] [&:not(:last-child)]:border-b-[1px] border-[#D9D9D9]'
            style={{
                gridTemplateColumns: 'max-content max-content 1fr max-content',
                gridTemplateRows: 'repeat(2,max-content)',
            }}
        >
            <GalkaButton
                onClick={toggleAvailPurchase}
                isActive={() => purchase.avail}
                classNames='col-span-1 row-span-full mr-[35px] shadow-boxShadowButton'
            />

            <img
                src={item.img_main}
                alt=''
                className='w-[116px] h-[167px] col-span-1 row-span-full rounded-md shadow-md'
            />

            <div className='flex flex-col col-span-1 row-span-full px-[16px]'>
                <span className='text-[16px]'>{item.name}</span>
                <span className='text-[16px]'>{purchase.size}</span>

                {maxQuantity > 1 ? (
                    <div className=' flex w-max h-[32px] rounded-[4px] border-[1px] border-[#E5E5E5] mt-auto mb-[40px] *:w-[32px] shadow-boxShadowButton'>
                        <button onClick={decrimentCount}>-</button>
                        <span className='U-center-content'>{purchase.quantity}</span>
                        <button onClick={incrimentCount}>+</button>
                    </div>
                ) : (
                    <span className='text-[14px] text-[#F93C00] mt-auto mb-[40px]'>
                        Последний
                    </span>
                )}
            </div>

            <span className='col-start-4 col-end-5 row-span-1 justify-self-end'>
                {item.price} ₽
            </span>
            <button
                className='col-start-4 col-end-5 row-span-1 self-end justify-self-end shadow-boxShadowButton bg-white p-[4px] rounded-[4px]'
                onClick={deletePurchaseHandler}
            >
                <img src={'/asserts/svg/musorka.svg'} alt='' />
            </button>
        </div>
    );
};
