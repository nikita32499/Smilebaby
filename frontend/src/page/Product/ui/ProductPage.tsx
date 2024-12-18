import { nextGetAllItems } from 'entities/item';
import { PageParams } from 'shared/types/params';
import { ProductClient } from './ProductClient/ProductClient';

interface IPropsProductPage extends PageParams {
    params: {
        productSlug: string;
    };
}

export const ProductPage: FC<IPropsProductPage> = async (props) => {
    const { params } = props;

    const items = await nextGetAllItems();

    const currentItem = items.find((item) => item.slug === params.productSlug);

    return currentItem ? (
        <div>
            <ProductClient item={currentItem} />
        </div>
    ) : (
        <div className='m-auto w-max text-[28px]'>Товар не найден</div>
    );
};
