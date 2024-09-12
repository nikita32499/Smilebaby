'use client';

import { IItem } from 'shared-smilebaby/dist/types/item.types';
import { Description } from './Description';
import { SidePanel } from './SidePanel';
import { Slider } from './Slider';

interface IPropsProductClient {
    item: IItem;
}

export const ProductClient: FC<IPropsProductClient> = (props) => {
    const { item } = props;
    return (
        <div
            className='grid grid-rows-2-max my-[45px] mx-auto w-max'
            style={{ gridTemplateColumns: 'minmax(0, 492px) max-content' }}
        >
            <Slider item={item} />
            <SidePanel item={item} />
            <Description item={item} />
        </div>
    );
};
