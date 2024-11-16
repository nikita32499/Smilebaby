export const LoadingSectionWidget: FC = () => {
    return (
        <div className='flex gap-[24px] justify-center'>
            {Array(4)
                .fill(null)
                .map((_) => {
                    return (
                        <div className='flex flex-col w-max justify-center items-center [&_span]:skeletonBlock gap-[18px]'>
                            <span className='rounded-full w-[80px] h-[80px]'></span>
                            <span className='h-[16px] w-[80px] rounded-[5px]'></span>
                        </div>
                    );
                })}
        </div>
    );
};
