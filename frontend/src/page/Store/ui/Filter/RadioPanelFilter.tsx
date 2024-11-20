import { AnimatePresence, motion } from 'framer-motion';
import { MotionPropsScale } from 'shared/config/motion';

interface IPropsRadioPanelFilter {
    options: {
        text: string;
        func: () => void;
        isActive: () => boolean;
    }[];
}

export const RadioPanelFilter: FC<IPropsRadioPanelFilter> = (props) => {
    const { options } = props;
    return (
        <div
            className='flex  flex-col gap-[18px] mt-[5px] py-[21px] px-[25px] bg-[#fff] absolute w-max rounded-[4px] shadow-boxShadowFilter '
            onClick={(event) => event.stopPropagation()}
        >
            {options.map((option) => {
                return (
                    <div>
                        <div onClick={option.func} className='flex'>
                            <div className='flex items-center justify-center rounded-full bg-[#fff] border-[#000] border-[1px] w-[24px] h-[24px]'>
                                <AnimatePresence>
                                    {option.isActive() && (
                                        <motion.div
                                            {...MotionPropsScale}
                                            className='w-[12px] h-[12px] rounded-full bg-[#000]'
                                        ></motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <span className='ml-[12px] '>{option.text}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
