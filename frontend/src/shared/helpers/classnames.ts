const expandClassName = (className: string): string => {
    return className.replace(
        /(\w+):\{(.*?)\}/g,
        (_, prefix: string, content: string): string => {
            return content
                .split(' ')
                .map((classPart: string) => `${prefix}:${classPart}`)
                .join(' ');
        },
    );
};

export const cn = (...cls: string[]): string => {
    return cls.map((cls_el) => expandClassName(cls_el)).join(' ');
};
