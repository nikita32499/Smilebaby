import { nextGetAllItems } from 'entities/item';
import { GetStaticPaths, Metadata } from 'next';
import { ProductPage } from 'page/Product';

export default ProductPage;

export const revalidate = 60;

export async function generateMetadata({
    params,
}: {
    params: { productSlug: string };
}): Promise<Metadata> {
    const itemList = await nextGetAllItems();
    const currentItem = itemList.find((item) => item.slug === params.productSlug);

    return {
        title: currentItem ? `${currentItem.name}` : 'Товар SmileBaby',
        description: currentItem ? `${currentItem.name}` : 'Товар SmileBaby',
    };
}

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
