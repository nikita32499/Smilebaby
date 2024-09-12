import { IItem } from 'shared-smilebaby/dist/types/item.types';

interface IPropsDescription {
    item: IItem;
}

type TField = {
    title: string;
    value: string;
}[];

export const Description: FC<IPropsDescription> = (props) => {
    const { item } = props;

    const field: TField = [
        {
            title: 'Сезон',
            value: item.season.value,
        },
        {
            title: 'Страна производства',
            value: item.country.value,
        },
    ];

    return (
        <div className='mt-[33px]'>
            <span className='text-[24px] border-b-[2px] border-black pb-[2px]'>
                О товаре
            </span>
            <div className='grid grid-cols-2 gap-x-[12px] my-[33px]'>
                {field.map((data) => (
                    <>
                        <span className='text-[16px] text-[#888888]'>
                            {data.title.padEnd(50, ' .')}
                        </span>
                        <span>{data.value}</span>
                    </>
                ))}
            </div>
            <span className='font-light text-[18px] '>{item.descriptions}</span>
        </div>
    );
};
