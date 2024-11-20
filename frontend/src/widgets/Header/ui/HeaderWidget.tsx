'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { cn } from 'shared/helpers/classnames';
import { useAppSelector } from 'shared/hook/redux-hooks';
import { useImmerState } from 'shared/hook/useImmerState';
import { CssDevToolHook } from 'shared/lib/cssDevTool/cssDevTool';
import { CustomLink } from 'shared/ui/CustomLink';
import { IconArrowLeftCircle } from 'shared/ui/Icons/IconArrowLeftCircle';
import { IconBurger } from 'shared/ui/Icons/IconBurger';
import { IconCart } from 'shared/ui/Icons/IconCart';
import { IconSmileBaby } from 'shared/ui/Icons/IconSmileBaby';
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

    const [state, setState] = useImmerState({ flow: { menu: false } });

    const leftLinks: IPropsLeftButton[] = [
        {
            text: 'Витрина',
            href: '/store',
        },
        {
            text: 'Контакты',
            href: '/contact',
        },
    ];

    useEffect(() => {
        CssDevToolHook();
    }, []);

    const toggleMenu = (value: boolean) => {
        return () => setState((prev) => (prev.flow.menu = value));
    };

    return (
        <div className='border-b-[1px] border-[#D9D9D9] '>
            <div className='grid grid-cols-3 items-center max-w-[var(--max-site-width)]  h-[103px] max-sm:h-[52px] m-auto relative'>
                <div
                    className={cn(
                        'flex gap-[15px] bg-white  max-sm:absolute max-sm:top-0 max-sm:left-0 max-sm:w-screen max-sm:p-[18px] max-sm:flex-col max-sm:h-screen max-sm:z-[1]',
                        state.flow.menu ? '' : 'max-sm:hidden',
                    )}
                >
                    <button
                        className='hidden max-sm:flex items-center '
                        onClick={toggleMenu(false)}
                    >
                        <IconArrowLeftCircle />
                        <p>Назад</p>
                    </button>
                    {leftLinks.map((link) => (
                        <LeftButton {...link} key={link.href} />
                    ))}
                </div>
                <div className='hidden max-sm:block ml-[18px]'>
                    <button onClick={toggleMenu(true)}>
                        <IconBurger />
                    </button>
                </div>
                <a href='/' className='m-auto w-[150px]'>
                    <IconSmileBaby />
                </a>
                <CustomLink
                    href={'/cart'}
                    className='flex ml-auto relative max-sm:mr-[18px]'
                >
                    <IconCart />
                    <span className='ml-[6px] text-[16px] max-sm:hidden'>Корзина</span>
                    <AnimatePresence>
                        {cartList.length > 0 && (
                            <motion.div
                                className='absolute font-medium text-[14px] text-white bg-[#F93C00] rounded-full w-[18px] h-[18px] top-[-14px] left-[11px] center-content'
                                animate={{ scale: [1, 1.5, 1] }}
                                initial={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ duration: 0.25 }}
                                key={cartList.length}
                            >
                                {cartList.length}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CustomLink>
            </div>
        </div>
    );
};
