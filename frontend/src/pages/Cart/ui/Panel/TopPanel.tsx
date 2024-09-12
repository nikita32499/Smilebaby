import { useActions, useAppSelector } from 'shared/hook/redux-hooks';
import { GalkaButton } from 'shared/ui/GalkaButton';

export const TopPanel: FC = () => {
    const cart = useAppSelector((store) => store.itemsSlice.cart);

    const { toggleAvailForEveryPurchase } = useActions();

    const selectAllState = cart.every((purchase) => purchase.avail);

    const toggleAvailForEveryPurchaseHandler = () => {
        toggleAvailForEveryPurchase();
    };

    return (
        <div
            className='border-b border-[#D9D9D9] pb-[20px]'
            style={{ gridColumn: '1/2', gridRow: '1/2' }}
        >
            <div>
                <span className='text-[40px]'>Корзина</span>
                <span className='ml-[16px] text-[24px] text-[#888]'>
                    {cart.length} товара
                </span>
            </div>
            <button
                onClick={toggleAvailForEveryPurchaseHandler}
                className='flex items-center'
            >
                <GalkaButton isActive={() => selectAllState} onClick={() => {}} />
                <span className='text-[16px] ml-[15px] mt-[2px]'>Выбрать всё</span>
            </button>
        </div>
    );
};
