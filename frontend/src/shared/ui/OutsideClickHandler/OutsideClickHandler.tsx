import { ReactNode, useEffect, useRef } from 'react';

interface OutsideClickHandlerProps {
    children: ReactNode;
    onOutsideClick: () => void;
    className?: string;
}

const OutsideClickHandler: FC<OutsideClickHandlerProps> = ({
    children,
    onOutsideClick,
    className = '',
}) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Функция для обработки клика
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                onOutsideClick();
            }
        };

        // Добавление обработчика событий
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            // Удаление обработчика событий при размонтировании компонента
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onOutsideClick]);

    return (
        <div ref={wrapperRef} className={className}>
            {children}
        </div>
    );
};

export default OutsideClickHandler;
