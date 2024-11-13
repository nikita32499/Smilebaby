import { IItem } from 'shared-smilebaby';
import { useImmerState } from 'shared/hook/useImmerState';

interface IPropsSlider {
    item: IItem;
}

interface IStateSlider {
    images: string[];
}

export const Slider: FC<IPropsSlider> = (props) => {
    const { item } = props;

    const [state, setState] = useImmerState<IStateSlider>({
        images: [item.img_main, ...item.img_prev],
    });

    const [bigImage, ...otherImages] = state.images;

    return (
        <div className='flex gap-[8px] '>
            <img
                src={bigImage ?? ''}
                alt=''
                className='max-h-[407px] rounded-[10px] shadow-lg'
            />
            <div className='flex flex-col gap-[8px] w-max'>
                {otherImages.map((image) => {
                    return (
                        <img
                            src={image}
                            alt=''
                            className='h-[77px] rounded-[4px] shadow-lg'
                            onClick={() => {
                                setState((prev) => {
                                    const index = prev.images.findIndex(
                                        (el) => el === image,
                                    );
                                    if (index === -1) throw new Error();

                                    prev.images = [
                                        ...prev.images.slice(index),
                                        ...prev.images.slice(0, index),
                                    ];
                                });
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};
