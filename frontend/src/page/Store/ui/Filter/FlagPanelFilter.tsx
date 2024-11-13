import Image from 'next/image';

interface IPropsFlagPanelFilter {
    options: {
        text: string;
        func: () => void;
        amount: number;
        isActive: () => boolean;
    }[];
}

export const FlagPanelFilter: FC<IPropsFlagPanelFilter> = (props) => {
    const { options } = props;

    return (
        <div
            className=' min-w-[284px]  mt-[5px] bg-[#fff] absolute w-max rounded-[4px] shadow-boxShadowFilter '
            onClick={(event) => event.stopPropagation()}
        >
            <div className='flex flex-col gap-[18px] py-[21px] px-[25px]'>
                {options.map((option) => {
                    return (
                        <button onClick={option.func} className='flex '>
                            <div className='h-[20px] w-[20px] border-[#000] border-[1px]'>
                                {option.isActive() && (
                                    <Image
                                        src='/asserts/svg/galka.svg'
                                        alt=''
                                        width={20}
                                        height={20}
                                    />
                                )}
                            </div>
                            <span className='ml-[9px]'>{option.text}</span>
                            <span className='ml-auto text-[13px] text-[#888] !font-inter'>
                                {option.amount} шт
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
