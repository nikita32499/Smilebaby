import { LoadingSectionWidget } from 'widgets/Section/ui/_Loading/LoadingSectionWidget';

export const LoadingStorePage: FC = () => {
    return (
        <>
            <div>
                <LoadingSectionWidget />
            </div>
            <div
                className={`flex flex-col items-start [&_span]:rounded-[10px] [&_span]:skeletonBlock`}
            >
                <span className='h-[28px] w-[147px]  '></span>
                <div className='mt-[10px]  flex gap-[10px] justify-start'>
                    {Array(5)
                        .fill(null)
                        .map((el) => {
                            return <span className='h-[35px] w-[70px]  '></span>;
                        })}
                </div>

                <div className='mt-[20px]  flex gap-[10px] justify-start'>
                    {Array(5)
                        .fill(null)
                        .map((el) => {
                            return (
                                <div className='flex flex-col'>
                                    <span className={`h-[334px] w-[232px]`}></span>
                                    <span className='w-[67px] h-[18px] mt-[16px]'></span>
                                    <span
                                        className={`w-[100px] h-[16px] mt-[16px]`}
                                    ></span>
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
};
