'use client';
import { cn } from 'shared/helpers/classnames';
import style from './style.module.scss';

export const LoadingWidget: FC = () => {
    return (
        <div className='flex justify-center items-center gap-[20px]'>
            {Array(3)
                .fill(null)
                .map((_, index) => {
                    return (
                        <div
                            className={cn(
                                style['scaleAnimation'],
                                'bg-black rounded-full w-[20px] h-[20px]',
                            )}
                        ></div>
                    );
                })}
        </div>
    );
};
