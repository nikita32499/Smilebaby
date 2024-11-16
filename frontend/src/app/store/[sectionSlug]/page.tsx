import { nextGetAllEntries } from 'entities/entries';
import { GetStaticPaths } from 'next';
import { StorePage } from 'page/Store';
import { mapSECTION } from 'shared/helpers/entries';

export default StorePage;

export const revalidate = 60;

// export const dynamicParams = true;
// type PageProps = React.ComponentProps<typeof StorePage>;

export const getStaticPaths: GetStaticPaths = async () => {
    const sections = mapSECTION(await nextGetAllEntries());

    const paths = sections.map((section) => {
        return {
            params: { sectionSlug: section.data.slug },
        };
    });

    return {
        paths,
        fallback: true,
    };
};
