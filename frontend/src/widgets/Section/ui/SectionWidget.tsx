'server-only';

import { nextGetAllEntries } from 'entities/entries';

import { IEntriesSection } from 'shared-smilebaby/dist/types/entries.types';
import { mapSECTION } from 'shared/helpers/entries';
import { CustomLink } from 'shared/ui/CustomLink';

export const SectionWidget = async () => {
    const entries = await nextGetAllEntries();

    return (
        <div className='flex    gap-[24px] items-center justify-center'>
            <CustomLink href={'/store/'} className='flex flex-col items-center'>
                <img
                    src={'/asserts/svg/SmileBaby.svg'}
                    className='rounded-[100px] w-[80px] h-[80px] bg-[#D9D9D9] '
                />
                <span className='mt-[18px] font-bold'>Все товары</span>
            </CustomLink>
            {mapSECTION(entries).map((entry) => (
                <EntryElement entry={entry} />
            ))}
        </div>
    );
};

interface IPropsEntry {
    entry: IEntriesSection;
}

const EntryElement: FC<IPropsEntry> = (props) => {
    const { entry } = props;

    return (
        <CustomLink
            href={`/store/${entry.data.slug}`}
            className='flex flex-col items-center'
        >
            <img
                src={entry.data.img}
                className='rounded-[100px] w-[80px] h-[80px] bg-[#D9D9D9]'
            />
            <span className='mt-[18px]'>{entry.value}</span>
        </CustomLink>
    );
};
