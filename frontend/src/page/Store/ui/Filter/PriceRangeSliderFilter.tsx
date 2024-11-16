import React, { useCallback } from 'react';
import ReactSlider from 'react-slider';
import { useImmerState } from 'shared/hook/useImmerState';
interface PriceRangeSliderProps {
    minPriceValue: number;
    maxPriceValue: number;
    absoluteMaxPrice: number;
    absoluteMinPrice: number;
    onPriceChange: (min: number, max: number) => void;
}

interface IStatePriceRangeSlider {
    minPriceValue: number;
    maxPriceValue: number;
}

export const PriceRangeSlider: React.FC<PriceRangeSliderProps> = (props) => {
    const [state, setState] = useImmerState<IStatePriceRangeSlider>({
        minPriceValue: props.minPriceValue,
        maxPriceValue: props.maxPriceValue,
    });

    const maxPriceValue =
        state.maxPriceValue > props.absoluteMaxPrice
            ? props.absoluteMaxPrice
            : state.maxPriceValue;
    const updatePriceFilter = useCallback(() => {
        props.onPriceChange(state.minPriceValue, state.maxPriceValue);
    }, []);

    const minDistance = (props.absoluteMaxPrice - props.absoluteMinPrice) / 100;

    return (
        <div
            className='absolute mt-[5px] min-w-[380px] bg-[#fff] pt-[20px] pb-[15px]  rounded-[4px] shadow-boxShadowFilter flex flex-col'
            onClick={(event) => event.stopPropagation()}
        >
            <div className='border-b-[1px] border-[#BFBFBF] pb-[20px] px-[12px]'>
                <ReactSlider
                    className='h-[6px] bg-[#888] w-full'
                    thumbClassName='w-[23px] h-[23px] rounded-full bg-[#fff] shadow-boxShadowFilter transform translate-y-[-37%]'
                    trackClassName=''
                    defaultValue={[state.minPriceValue, state.maxPriceValue]}
                    ariaLabel={['Lower thumb', 'Upper thumb']}
                    ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                    renderThumb={(props, state) => <div {...props}></div>}
                    pearling
                    min={props.absoluteMinPrice}
                    max={props.absoluteMaxPrice}
                    minDistance={minDistance}
                    onAfterChange={([min, max]) => {
                        if (min === undefined || max === undefined) throw new Error();
                        setState((prev) => {
                            // prev.maxPriceValue = max;
                            // prev.minPriceValue = min;
                            prev.maxPriceValue = max;
                            prev.minPriceValue = min;
                        });
                        // props.onPriceChange(min, max);
                        updatePriceFilter();
                    }}
                />

                <div className='flex items-center justify-between mt-[40px] '>
                    <div className='flex flex-col items-start '>
                        <span className='text-[12px]'>Мин. цена</span>
                        <input
                            type='number'
                            className='font-bold text-[15px] border-b-[1px] border-[#000] py-[4px] max-w-[150px]'
                            defaultValue={state.minPriceValue}
                            value={state.minPriceValue}
                            onChange={updatePriceFilter}
                        />
                    </div>
                    <div className='bg-[#000] w-[15px] h-[1px]'></div>
                    <div className='flex flex-col items-start'>
                        <span className='text-[12px]'>Макс. цена</span>
                        <input
                            type='number'
                            defaultValue={maxPriceValue}
                            value={maxPriceValue}
                            className='font-bold text-[15px] border-b-[1px] border-[#000] py-[4px] max-w-[150px]'
                            onChange={updatePriceFilter}
                        />
                    </div>
                </div>
            </div>
            {/* <button
                onClick={() => {
                    props.onPriceChange(state.minPriceValue, state.maxPriceValue);
                }}
                className='rounded-[4px] bg-[#000] font-light text-[14px] text-white h-[44px] w-[184px] mt-[16px] ml-[12px]'
            >
                Применить
            </button> */}
        </div>
    );
};

export default PriceRangeSlider;
