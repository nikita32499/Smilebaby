import cn from 'classnames';
import { getFinallyCount, getFinallyPrice } from 'entities/item/helper/cart';
import { CartContext } from 'pages/Cart/model/context';
import { useContext } from 'react';
import { useAppSelector } from 'shared/hook/redux-hooks';

export const PricePanel: FC = () => {
    const cart = useAppSelector((store) => store.itemsSlice.cart);

    const finallyPrice = getFinallyPrice(cart);

    const finallyCount = getFinallyCount(cart);

    const context = useContext(CartContext);

    return (
        <div
            style={{ gridColumn: '2/3', gridRow: '1/3' }}
            className='max-w-[384px] p-[16px] rounded-[8px] shadow-[0_0_8px_#0004] h-max ml-[24px]'
        >
            <span
                className={cn(
                    'text-[24px]',
                    finallyCount > 0 ? 'text-black' : 'text-[#9f9f9f]',
                )}
            >
                Сумма заказа
            </span>

            <div className='flex *:text-[16px] justify-between my-[25px]'>
                {finallyCount > 0 && (
                    <>
                        <span>{finallyCount} товара на сумму</span>
                        <span>{finallyPrice} ₽</span>
                    </>
                )}
            </div>
            <button
                className={cn(
                    'rounded-[4px]    w-full h-[52px]',
                    finallyCount > 0
                        ? 'bg-black text-white'
                        : 'bg-[#c7c7c7] text-[#9f9f9f]',
                )}
                onClick={() => {
                    context.setState((prev) => {
                        prev.flow.state = 'form';
                    });
                }}
            >
                <span>Перейти к оформлению</span>
            </button>
        </div>
    );
};
