import { IPurchase } from 'entities/item/store/items.slice';
import { useAppSelector } from 'shared/hook/redux-hooks';
import { CartElement } from './CartElement';

type SectionMap = Record<string, IPurchase[]>;

interface IPropsCardListSection {
    section: string;
    purchaseList: IPurchase[];
}

const CardListSection: FC<IPropsCardListSection> = (props) => {
    const { section, purchaseList } = props;
    return (
        <div className='mb-[30px]'>
            <span className='text-[24px]'>{section}</span>
            <div className='flex flex-col'>
                {purchaseList.map((purchase) => (
                    <CartElement purchase={purchase} />
                ))}
            </div>
        </div>
    );
};

export const CartList: FC = () => {
    const cart = useAppSelector((store) => store.itemsSlice.cart);

    const data = cart.reduce<SectionMap>((acc, next) => {
        const section = next.item.section.value;
        if (!(section in acc)) {
            acc[section] = [];
        }

        acc[section]?.push(next);

        return acc;
    }, {});

    return (
        <div className='pt-[50px]' style={{ gridColumn: '1/2', gridRow: '2/3' }}>
            {Object.entries(data).map(([section, purchaseList]) => (
                <CardListSection {...{ section, purchaseList }} />
            ))}
        </div>
    );
};
