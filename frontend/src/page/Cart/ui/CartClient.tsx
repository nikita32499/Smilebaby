'use client';

import { useAppSelector } from 'shared/hook/redux-hooks';
import { useImmerState } from 'shared/hook/useImmerState';
import { CustomLink } from 'shared/ui/CustomLink';
import { CartContext, IStateCartClient } from '../model/context';
import { CartList } from './CartList/CartList';
import { PricePanel } from './Panel/PricePanel';
import { TopPanel } from './Panel/TopPanel';
import { PaymentStep } from './PaymentStep/PaymentStep';

const Cart: FC = () => {
    const cart = useAppSelector((store) => store.itemsSlice.cart);

    return cart.length ? (
        <div
            className='grid py-[20px] ml-auto'
            style={{
                gridTemplateColumns: 'repeat(2,1fr)',
                gridTemplateRows: 'max-content max-content',
            }}
        >
            <TopPanel />
            <CartList />
            <PricePanel />
        </div>
    ) : (
        <div className='U-center-content flex-grow flex flex-col w-max'>
            <span className='text-[32px]'>Ваша корзина пуста</span>
            <CustomLink
                href='/store'
                className='w-full h-[50px] rounded-[10px] shadow-boxShadowButton px-[30px] mt-[25px] U-center-content'
            >
                Перейти к каталогу
            </CustomLink>
        </div>
    );
};

export const CartClient: FC = () => {
    const [state, setState] = useImmerState<IStateCartClient>({
        flow: {
            state: 'cart',
        },
    });

    return (
        <CartContext.Provider value={{ setState }}>
            {state.flow.state === 'cart' ? <Cart /> : <PaymentStep />}
        </CartContext.Provider>
    );
};
