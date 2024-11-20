import { nextGetAllItems } from 'entities/item';
import { GetStaticPaths } from 'next';
import { ProductPage } from 'page/Product';

export default ProductPage;

export const revalidate = 60;

// export const dynamicParams = true;

export const getStaticPaths: GetStaticPaths = async () => {
    const itemList = await nextGetAllItems();

    const paths = itemList.map((item) => ({
        params: {
            productSlug: item.slug,
        },
    }));

    return {
        paths,
        fallback: true,
    };
};
