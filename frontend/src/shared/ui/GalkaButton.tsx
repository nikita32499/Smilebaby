interface IPropsGalkaButton {
    onClick: () => void;
    isActive: () => boolean;
    classNames?: string;
}

import cn from 'classnames';
import Image from 'next/image';

export const GalkaButton: FC<IPropsGalkaButton> = (props) => {
    const { isActive, onClick, classNames = '' } = props;
    return (
        <button
            className={cn('h-[20px] w-[20px] border-black border-[1px] ', classNames)}
            onClick={onClick}
        >
            {isActive() && (
                <Image src='/asserts/svg/galka.svg' alt='' width={20} height={20} />
            )}
        </button>
    );
};
