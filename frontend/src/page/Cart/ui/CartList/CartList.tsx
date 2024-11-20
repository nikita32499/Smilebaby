import { IPurchase } from 'entities/item/store/items.slice';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppSelector } from 'shared/hook/redux-hooks';
import { CartElement } from './CartElement';
type SectionMap = Record<string, IPurchase[]>;
interface IPropsCardListSection {
    section: string;
}

const CardListSection: FC<IPropsCardListSection> = (props) => {
    const { section } = props;

    const purchaseList = useAppSelector(
        (store) =>
            store.itemsSlice.cart.filter(
                (purchase) => purchase.item.section.value === section,
            ),
        (prev, next) => prev.length === next.length,
    );

    return (
        <>
            <span className='text-[24px]'>{section}</span>
            <div className='flex flex-col'>
                <AnimatePresence>
                    {purchaseList.map((purchase) => (
                        <motion.div
                            transition={{ duration: 0.25 }}
                            key={purchase.item.id.toString() + purchase.size}
                            animate={{ translateX: 0, opacity: 1 }}
                            exit={{ translateX: -200, opacity: 0 }}
                            className='grid grid-rows-[repeat(2,max-content)]  grid-cols-[max-content_max-content_1fr_max-content] max-w-[600px] py-[15px] [&:not(:last-child)]:border-b-[1px] border-[#D9D9D9]'
                        >
                            <CartElement purchase={purchase} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </>
    );
};

const sectionMap = (cart: IPurchase[]) =>
    cart.reduce<SectionMap>((acc, next) => {
        const section = next.item.section.value;
        if (!(section in acc)) {
            acc[section] = [];
        }

        acc[section]?.push(next);

        return acc;
    }, {});

export const CartList: FC = () => {
    const sectionList = useAppSelector(
        (store) => {
            const sectionList = sectionMap(store.itemsSlice.cart);

            return Object.keys(sectionList);
        },
        (prev, next) => prev.length === next.length,
    );

    return (
        <div className='pt-[50px]' style={{ gridColumn: '1/2', gridRow: '2/3' }}>
            <AnimatePresence>
                {sectionList.map((section) => (
                    <motion.div
                        className='mb-[30px]'
                        animate={{ translateX: 0, opacity: 1 }}
                        exit={{ translateX: -200, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        key={section}
                    >
                        <CardListSection {...{ section }} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
