'server-only';
import { nextGetAllEntries } from 'entities/entries';
import { GetStaticPaths } from 'next';
import { StorePage } from 'pages/Store';
import { mapSECTION } from 'shared/helpers/entries';

export default StorePage;

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
        fallback: false,
    };
};
