import LoadingWidget from 'app/loading';
import { SectionWidget } from 'widgets/Section';

export const HomePage = () => {
    return (
        <div className='flex flex-col flex-grow items-center'>
            <div className='mt-[38px]'>
                <SectionWidget />
            </div>
            <LoadingWidget />
            <div className='m-auto flex flex-col items-center'>
                <h1 className=' text-[36px] font-bold'>
                    Магазин детской одежды в Ярославле
                </h1>
                <h2 className='mt-[20px] text-[24px] font-medium'>
                    Лучшие цены на все товары в городе!
                </h2>
            </div>
        </div>
    );
};
