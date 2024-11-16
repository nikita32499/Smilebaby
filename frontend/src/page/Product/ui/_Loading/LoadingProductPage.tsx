export const LoadingProductPage: FC = () => {
    return (
        <div className='grid  grid-cols-[auto_auto] w-max [&_span]:skeletonBlock'>
            <div className='grid grid-cols-[auto_auto] w-max gap-[8px]'>
                <span className='h-[405px] w-[281px]'></span>
                <div className='flex flex-col gap-[8px] justify-start'>
                    {Array(3)
                        .fill(null)
                        .map((_) => {
                            return <span className='h-[77px] w-[53px]'></span>;
                        })}
                </div>
            </div>

            <div className='flex flex-col'>
                <span className='h-[16px] w-[100px]'></span>
                <span className='h-[1px] w-[100px]'></span>
                <span className='h-[16px] w-[100px]'></span>
            </div>
        </div>
    );
};
