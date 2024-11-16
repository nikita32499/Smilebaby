import cn from 'classnames';
import { useEffect } from 'react';
import { IItem } from 'shared-smilebaby';
import { ImagePreloader } from 'shared/helpers/ImagePreloader';
import { useImmerState } from 'shared/hook/useImmerState';

interface IPropsSlider {
    item: IItem;
}

interface IStateSlider {
    currentImg: string;
}

export const Slider: FC<IPropsSlider> = (props) => {
    const { item } = props;

    const [state, setState] = useImmerState<IStateSlider>({
        currentImg: item.img_main,
    });

    const images = [item.img_main, ...item.img_prev];

    useEffect(() => {
        for (const img of images) {
            ImagePreloader({ url: img });
        }
    }, []);

    return (
        <div className='group grid grid-cols-1 grid-rows-1'>
            <img
                className='col-[1/1] row-[1/1] rounded-md'
                src={state.currentImg}
                alt={item.name}
            />
            <div className='flex h-full col-[1/1] row-[1/1] mt-[4px] mx-[1px]'>
                {images.map((src, index) => {
                    return (
                        <div
                            key={index}
                            className='flex-grow'
                            onMouseMove={() => {
                                setState((prev) => {
                                    prev.currentImg = src;
                                });
                            }}
                            onMouseLeave={() => {
                                setState((prev) => {
                                    prev.currentImg = item.img_main;
                                });
                            }}
                        >
                            {images.length > 1 && (
                                <div
                                    className={cn(
                                        'hidden mx-[1px] h-[3px] rounded-full  group-hover:block w-auto',
                                        src === state.currentImg
                                            ? 'bg-[#3C3C3C]'
                                            : 'bg-[#A8A8A8]',
                                    )}
                                ></div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
