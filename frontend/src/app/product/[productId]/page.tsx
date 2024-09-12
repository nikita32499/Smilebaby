import { nextGetAllItems } from 'entities/item';
import { GetStaticPaths } from 'next';
import { ProductPage } from 'pages/Product';

export default ProductPage;

export const getStaticPaths: GetStaticPaths = async () => {
    const itemList = await nextGetAllItems();

    const paths = itemList.map((item) => ({
        params: {
            productId: item.id.toString(),
        },
    }));

    return {
        paths,
        fallback: false,
    };
};
