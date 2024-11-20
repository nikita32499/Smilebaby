'use client';

import { useRouter } from 'next/navigation';
import { IItem } from 'shared-smilebaby';
import { IconArrowLeftCircle } from 'shared/ui/Icons/IconArrowLeftCircle';
import { Description } from './Description';
import { SidePanel } from './SidePanel';
import { Slider } from './Slider';

interface IPropsProductClient {
    item: IItem;
}

export const ProductClient: FC<IPropsProductClient> = (props) => {
    const { item } = props;
    const router = useRouter();

    return (
        <div className='grid grid-rows-2-max my-[45px] mx-auto w-max relative grid-cols-[minmax(0,492px)_max-content]'>
            <button
                onClick={router.back}
                className='absolute flex gap-[8px] left-[-50px] top-[0px] transform -translate-x-full shadow-boxShadowButton p-[10px] rounded-full'
            >
                <IconArrowLeftCircle />
            </button>
            <Slider item={item} />
            <SidePanel item={item} />
            <Description item={item} />
        </div>
    );
};
