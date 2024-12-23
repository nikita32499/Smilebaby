import { getFinallyPrice } from 'entities/item/helper/cart';
import { IPurchase } from 'entities/item/store/items.slice';
import { OrderApi } from 'entities/order/api/order.api';
import { useRouter } from 'next/navigation';
import { CartContext } from 'page/Cart/model/context';
import { ChangeEvent, useContext, useEffect } from 'react';
import { IOrderCreate, SchemaOrderCreate } from 'shared-smilebaby';
import { useAppSelector } from 'shared/hook/redux-hooks';
import { useImmerState } from 'shared/hook/useImmerState';
import { IconArrowLeftCircle } from 'shared/ui/Icons/IconArrowLeftCircle';
import { PopUp } from '../PopUp/PopUp';

// const SchemaFormPaymentStep = z.object({
//     phone: z.string(),
//     name: z.string(),
//     email: z.string().optional(),
// });

interface IStatePaymentStep {
    formData: Partial<Omit<IOrderCreate['createData'], 'cart'>>;
    error?: string;
    popUp: boolean;
}

interface IPropsForm {
    state: IStatePaymentStep;
    onChange: (
        event: ChangeEvent<HTMLInputElement>,
        key: keyof IStatePaymentStep['formData'],
    ) => void;
}

const Form: FC<IPropsForm> = (props) => {
    const context = useContext(CartContext);
    const { onChange, state } = props;
    const goBack = () => {
        context.setState((prev) => {
            prev.flow.state = 'cart';
        });
    };

    return (
        <div className='flex flex-col max-w-[568px]'>
            <button className='U-center-content w-max ' onClick={goBack}>
                <IconArrowLeftCircle />
                <span className='text-[16px] ml-[18px]'>Назад в корзину</span>
            </button>

            <div className='my-[30px] flex flex-col'>
                <span className='text-[40px]'>Оформление заказа</span>
                <span className='text-[20px] mt-[12px]'>
                    Пожалуйста заполните форму, и с вами свяжуться для оформления заказа.
                    Спасибо что выбираете нас!
                </span>
            </div>
            <div className='flex gap-[10px] flex-col *:h-[50px]  *:shadow-[0_1px_10px_#666] *:rounded-[10px]'>
                <input
                    type='text'
                    placeholder='Имя*'
                    onChange={(e) => onChange(e, 'name')}
                    pattern='[a-zA-Zа-яА-Я]{2,}'
                    required
                />
                <input
                    type='text'
                    placeholder='Телефон*'
                    onChange={(e) => onChange(e, 'phone')}
                    pattern='[0-9]{11}'
                    required
                />
                <input
                    type='text'
                    placeholder='Почта (необязательно)'
                    onChange={(e) => onChange(e, 'email')}
                    pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
                />
            </div>

            {state.error ? (
                <span className='text-[#f00] text-[18px] mt-[30px]'>{state.error}</span>
            ) : (
                <span className='opacity-0 text-[#f00] text-[18px] mt-[30px]'>!</span>
            )}
        </div>
    );
};
interface IPropsPanel {
    cart: IPurchase[];
    onSubmit: () => void;
}
const Panel: FC<IPropsPanel> = (props) => {
    const { cart, onSubmit } = props;

    const finallyPrice = getFinallyPrice(cart);

    return (
        <div className='ml-auto col-span-1 p-[16px] max-w-[384px] shadow-boxShadowFilter rounded-[8px] h-max'>
            <span className='text-[24px]'>Ваш заказ</span>
            <div className='flex gap-[8px] my-[24px]'>
                {cart.map((purchase) => (
                    <div className='w-[64px] h-[93px] relative'>
                        <img src={purchase.item.img_main} alt='' />
                        {purchase.quantity > 0 && (
                            <span className='absolute bottom-[0px] h-[15px]  text-[12px] text-white bg-[#252525] px-[3px]'>
                                {purchase.quantity} шт
                            </span>
                        )}
                    </div>
                ))}
            </div>
            <div className='flex justify-between text-[24px]'>
                <span>Итого</span>
                <span>{finallyPrice} ₽</span>
            </div>
            <button
                onClick={onSubmit}
                className='w-full  h-[52px] text-white bg-black rounded-[4px] mt-[27px]'
            >
                Оформить заказ
            </button>
        </div>
    );
};

export const PaymentStep: FC = () => {
    const cart = useAppSelector((store) => store.itemsSlice.cart);

    const router = useRouter();

    const [state, setState] = useImmerState<IStatePaymentStep>({
        formData: {},
        popUp: false,
    });

    const onChange = (
        event: ChangeEvent<HTMLInputElement>,
        key: keyof IStatePaymentStep['formData'],
    ) => {
        setState((prev) => {
            prev.formData[key] = event.target.value;
        });
    };

    const [createOrder, { isLoading }] = OrderApi.useCreateMutation();

    const onSubmit = async () => {
        const validateData = SchemaOrderCreate.safeParse({
            createData: {
                ...state.formData,
                cart,
            },
        });
        if (validateData.success) {
            const result = await createOrder(validateData.data);

            if ('data' in result) {
                setState((prev) => {
                    prev.popUp = true;
                });

                setTimeout(() => {
                    router.push('/');
                }, 3000);
            }
        } else {
            setState((prev) => {
                prev.error = 'Укажите все поля';
            });
        }
    };

    useEffect(() => {
        if (state.error) {
            setTimeout(() => {
                setState((prev) => {
                    delete prev.error;
                });
            }, 10000);
        }
    }, [state.error]);

    return (
        <div className='grid' style={{ gridTemplateColumns: 'repeat(2,1fr)' }}>
            <Form state={state} onChange={onChange} />
            <Panel onSubmit={onSubmit} cart={cart} />
            {state.popUp && (
                <PopUp
                    close={() =>
                        setState((prev) => {
                            prev.popUp = false;
                        })
                    }
                />
            )}
        </div>
    );
};
