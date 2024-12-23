import { nextGetAllEntries } from 'entities/entries';

import { IEntriesSection } from 'shared-smilebaby';
import { mapSECTION } from 'shared/helpers/entries';
import { CustomLink } from 'shared/ui/CustomLink';
import { IconSmileBaby } from 'shared/ui/Icons/IconSmileBaby';

export const SectionWidget = async () => {
    const entries = await nextGetAllEntries();

    return (
        <div className='flex    gap-[24px] items-center justify-center'>
            <CustomLink href={'/store/'} className='flex flex-col items-center '>
                <div className='shadow-[0_0_20px_#838383] h-[80px] w-[80px] rounded-full  flex items-center'>
                    <IconSmileBaby width={80} />
                </div>
                <span className='mt-[18px] font-bold'>Все товары</span>
            </CustomLink>
            {mapSECTION(entries).map((entry) => (
                <EntryElement entry={entry} key={entry.id} />
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
                height={80}
                width={80}
                alt={`Раздел ${entry.value}}`}
                src={entry.data.img}
                className='shadow-[0_0_20px_#838383] rounded-[100px] w-[80px] h-[80px] bg-[#D9D9D9]'
            />
            <span className='mt-[18px]'>{entry.value}</span>
        </CustomLink>
    );
};
