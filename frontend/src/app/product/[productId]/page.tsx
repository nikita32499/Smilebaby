import { nextGetAllItems } from 'entities/item';
import { GetStaticPaths } from 'next';
import { LoadingProductPage } from 'page/Product/ui/_Loading/LoadingProductPage';

// export default ProductPage;

export default LoadingProductPage;

export const revalidate = 60;

// export const dynamicParams = true;

export const getStaticPaths: GetStaticPaths = async () => {
    const itemList = await nextGetAllItems();

    const paths = itemList.map((item) => ({
        params: {
            productId: item.id.toString(),
        },
    }));

    return {
        paths,
        fallback: true,
    };
};
