export const LoadingProductPage: FC = () => {
    return (
        <div className='grid  grid-cols-[repeat(2,auto)] w-max [&_span]:skeletonBlock [&_span]:rounded-[10px] gap-[57px_70px]'>
            <div className='grid grid-cols-[auto_auto] w-max gap-[8px] col-[1/2] row-[1/2]'>
                <span className='h-[405px] w-[281px]'></span>
                <div className='flex flex-col gap-[8px] justify-start'>
                    {Array(4)
                        .fill(null)
                        .map((_) => {
                            return <span className='h-[77px] w-[53px]'></span>;
                        })}
                </div>
            </div>

            <div className=' flex flex-col h-full col-[2/3] row-[1/2]'>
                <span className='h-[24px] w-[100px]'></span>
                <span className='h-[24px] w-[50px] mt-[10px]'></span>

                <div className='grid grid-cols-[repeat(3,max-content)] gap-[8px] mt-[80px]'>
                    {Array(6)
                        .fill(null)
                        .map((_) => {
                            return <span className='h-[48px] w-[64px]'></span>;
                        })}
                </div>

                <span className='h-[54px] w-[286px] mt-auto'></span>
            </div>

            <div className='flex flex-col col-[1/2] row-[2/3]'>
                <span className='w-[100px] h-[34px]'></span>

                <span className='w-[70%] h-[15px] mt-[15px]'></span>
                <span className='w-[70%] h-[15px] mt-[10px]'></span>

                <span className='w-full h-[80px] mt-[15px]'></span>
            </div>
        </div>
    );
};
