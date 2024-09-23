'use client';
import { useAppSelector } from 'shared/hook/redux-hooks';
import { CustomLink } from 'shared/ui/CustomLink';

interface IPropsLeftButton {
    text: string;
    href: string;
}
const LeftButton: FC<IPropsLeftButton> = (props) => {
    const { text, href } = props;
    return <a href={href}>{text}</a>;
};

export const HeaderWidget: FC = () => {
    const cartList = useAppSelector((store) => store.itemsSlice.cart);

    const leftLinks: IPropsLeftButton[] = [
        {
            text: 'Витрина',
            href: '/store',
        },
        {
            text: 'О нас',
            href: '/about-us',
        },
        {
            text: 'Контакты',
            href: '/contact',
        },
    ];

    return (
        <div className='border-b-[1px] border-[#D9D9D9]'>
            <div className='grid grid-cols-3 items-center max-w-[var(--max-site-width)]  h-[103px] m-auto'>
                <div className='flex gap-[15px]'>
                    {leftLinks.map((link) => (
                        <LeftButton {...link} />
                    ))}
                </div>
                <a href='/' className='m-auto'>
                    <img src='/asserts/svg/SmileBaby.svg' alt='' />
                </a>
                <CustomLink href={'/cart'} className='flex ml-auto relative'>
                    <img src='/asserts/svg/korzina.svg' alt='' />
                    <span className='ml-[6px] text-[16px]'>Корзина</span>

                    {cartList.length > 0 && (
                        <div className='absolute font-medium text-[14px] text-white bg-[#F93C00] rounded-full w-[18px] h-[18px] top-[-14px] left-[11px] center-content'>
                            {cartList.length}
                        </div>
                    )}
                </CustomLink>
            </div>
        </div>
    );
};
