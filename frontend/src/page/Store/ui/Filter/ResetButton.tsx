import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { MotionPropsScale } from 'shared/config/motion';
import { useActions, useAppSelector } from 'shared/hook/redux-hooks';
export const ResetButton = () => {
    const modified = useAppSelector((store) => store.itemsSlice.filter.modified);
    const { resetFilter } = useActions();
    return (
        <AnimatePresence>
            <motion.button
                {...MotionPropsScale}
                className={cn(
                    'h-[35px] px-[9px] w-max rounded-[5px] border-[#E5E5E5] border-[1px] relative bg-black text-white ml-auto max-md:top-0 max-md:right-0 max-md:translate-y-[-100%] max-md:absolute max-md:bg-transparent max-md:text-black max-md:border-0 max-md:font-bold',
                )}
                onClick={() => {
                    resetFilter();
                }}
                exit={{ opacity: 0 }}
                animate={{ opacity: modified ? 1 : 0 }}
                initial={{ opacity: 0 }}
            >
                Сбросить
            </motion.button>
        </AnimatePresence>
    );
};
