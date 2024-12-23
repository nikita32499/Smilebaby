import { nextGetAllEntries } from 'entities/entries';
import { nextGetAllItems } from 'entities/item';
import { mapSECTION } from 'shared/helpers/entries';
import { SectionWidget } from 'widgets/Section';
import { StoreClient } from './StoreClient/StoreClient';

interface IPropsStorePage {
    params: {
        sectionSlug: string;
    };
}

export const StorePage: FC<IPropsStorePage> = async (props) => {
    const {
        params: { sectionSlug },
    } = props;
    const items = await nextGetAllItems(); // Загружаем все items
    const sections = mapSECTION(await nextGetAllEntries());
    const currentSection = sections.find((section) => section.data.slug === sectionSlug);

    

    return (
        <>
            <div>
                <SectionWidget />
            </div>

            <StoreClient {...{ currentSection, items }} />
        </>
    );
};
