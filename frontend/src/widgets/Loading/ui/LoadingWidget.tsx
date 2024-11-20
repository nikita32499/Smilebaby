import { cn } from 'shared/helpers/classnames';
import style from './style.module.scss';
export const MainLoadingWidget: FC = () => {
    return (
        <div className='m-auto flex gap-[10px] justify-center items-center'>
            {Array(3)
                .fill(null)
                .map((_, index) => {
                    return (
                        <span
                            className={cn(
                                'rounded-full h-[20px] w-[20px] bg-[#d0d0d0] shadow-[0_0_5px_#d0d0d0]',
                                style.scaleAnimation,
                            )}
                            style={{ animationDelay: `${index * 0.085}s` }}
                        ></span>
                    );
                })}
        </div>
    );
};
