import cn from 'classnames';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import { IItem } from 'shared-smilebaby';
import { useActions, useAppSelector } from 'shared/hook/redux-hooks';
import { useImmerState } from 'shared/hook/useImmerState';
import OutsideClickHandler from 'shared/ui/OutsideClickHandler/OutsideClickHandler';
import { FlagPanelFilter } from './FlagPanelFilter';
import { convertToOptions } from './helpers/convertToOptions';
import PriceRangeSlider from './PriceRangeSliderFilter';
import { RadioPanelFilter } from './RadioPanelFilter';
import { ResetButton } from './ResetButton';
interface IPropsFilterButton extends PropsWithChildren {
    text: string;
    active: boolean;
}

interface IStateFilterButton {
    flow: {
        open: boolean;
    };
}

//box-content py-[2px] px-[9px] w-max h-[35px]
const FilterButton: FC<IPropsFilterButton> = (props) => {
    const { text, active, children } = props;

    const [state, setState] = useImmerState<IStateFilterButton>({
        flow: {
            open: false,
        },
    });

    const handleOutsideClick = () => {
        if (state.flow.open === true) {
            setState((prev) => {
                prev.flow.open = false;
            });
        }
    };

    return (
        <OutsideClickHandler onOutsideClick={handleOutsideClick} className='w-max'>
            <button
                className={cn(
                    'h-[35px]  w-max rounded-[5px] border-[#E5E5E5] border-[1px]  ', //relative
                    active ? 'bg-[#000]' : 'bg-[#fff]',
                )}
                onClick={() => {
                    setState((prev) => {
                        prev.flow.open = true;
                    });
                }}
            >
                <div className='px-[9px]'>
                    <span className={active ? 'text-[#fff] ' : ''}>{text}</span>

                    <Image
                        className='inline ml-[7px]'
                        src={
                            active
                                ? '/asserts/svg/rowToDownWhite.svg'
                                : '/asserts/svg/rowToDownBlack.svg'
                        }
                        alt=''
                        width={12}
                        height={7}
                    />
                </div>
                <div style={{ transform: 'translateY(9px)' }}>
                    {state.flow.open && children}
                </div>
            </button>
        </OutsideClickHandler>
    );
};

interface IPropsFilter {
    items: IItem[];
}

export const Filter: FC<IPropsFilter> = (props) => {
    const { items } = props;

    const { setFilter } = useActions();
    const sortFilterValue = useAppSelector((store) => store.itemsSlice.filter.sort);
    const seasonFilterValue = useAppSelector((store) => store.itemsSlice.filter.season);
    const countryFilterValue = useAppSelector((store) => store.itemsSlice.filter.country);
    const sizeFilterValue = useAppSelector((store) => store.itemsSlice.filter.size);
    const priceFilterValue = useAppSelector((store) => store.itemsSlice.filter.price);

    const { absoluteMaxPrice, absoluteMinPrice } = useAppSelector(
        (store) => store.itemsSlice.meta,
    );

    type TRecordEntry = Record<string, number>;

    const seasonRecord = convertToOptions({
        isActive: (value) => seasonFilterValue.includes(value),
        func: (value) => {
            setFilter([{ key: 'season', value }]);
        },
        data: items.reduce<TRecordEntry>((acc, next) => {
            const seasonValue = next.season.value;
            if (seasonValue in acc && typeof acc[seasonValue] === 'number') {
                acc[seasonValue] += 1;
            } else {
                acc[seasonValue] = 1;
            }
            return acc;
        }, {}),
    });

    const countryRecord = convertToOptions({
        isActive: (value) => countryFilterValue.includes(value),
        func: (value) => {
            setFilter([{ key: 'country', value }]);
        },
        data: items.reduce<TRecordEntry>((acc, next) => {
            const countryValue = next.country.value;
            if (countryValue in acc && typeof acc[countryValue] === 'number') {
                acc[countryValue] += 1;
            } else {
                acc[countryValue] = 1;
            }
            return acc;
        }, {}),
    });

    const sizeRecord = convertToOptions({
        isActive: (value) => sizeFilterValue.includes(value),
        func: (value) => {
            setFilter([{ key: 'size', value }]);
        },
        data: items
            .map((item) => item.amount)
            .flat()
            .reduce<TRecordEntry>((acc, next) => {
                const sizeValue = next.size;
                if (sizeValue in acc && typeof acc[sizeValue] === 'number') {
                    acc[sizeValue] += 1;
                } else {
                    acc[sizeValue] = 1;
                }
                return acc;
            }, {}),
    });

    return (
        <div className='flex gap-[10px] max-md:w-full max-md:flex-wrap relative'>
            <FilterButton
                text={'По возрастанию цены'}
                active={sortFilterValue !== 'default'}
            >
                <RadioPanelFilter
                    options={[
                        {
                            text: 'По умолчанию',
                            func: () => {
                                setFilter([{ key: 'sort', value: 'default' }]);
                            },
                            isActive: () => sortFilterValue === 'default',
                        },
                        {
                            text: 'По возрастанию цены',
                            func: () => {
                                setFilter([{ key: 'sort', value: 'by price+' }]);
                            },
                            isActive: () => sortFilterValue === 'by price+',
                        },
                        {
                            text: 'По убыванию цены',
                            func: () => {
                                setFilter([{ key: 'sort', value: 'by price-' }]);
                            },
                            isActive: () => sortFilterValue === 'by price-',
                        },
                    ]}
                />
            </FilterButton>
            <FilterButton
                text={'Цена'}
                active={priceFilterValue.min !== 0 || priceFilterValue.max !== 9999999}
            >
                <PriceRangeSlider
                    maxPriceValue={priceFilterValue.max}
                    minPriceValue={priceFilterValue.min}
                    absoluteMaxPrice={absoluteMaxPrice}
                    absoluteMinPrice={absoluteMinPrice}
                    onPriceChange={(min, max) => {
                        setFilter([{ key: 'price', value: { min, max } }]);
                    }}
                />
            </FilterButton>
            <FilterButton text={'Размер'} active={sizeFilterValue.length > 0}>
                <FlagPanelFilter options={sizeRecord} />
            </FilterButton>
            <FilterButton text={'Страна'} active={countryFilterValue.length > 0}>
                <FlagPanelFilter options={countryRecord} />
            </FilterButton>
            <FilterButton text={'Сезон'} active={seasonFilterValue.length > 0}>
                <FlagPanelFilter options={seasonRecord} />
            </FilterButton>
            <ResetButton />
        </div>
    );
};
