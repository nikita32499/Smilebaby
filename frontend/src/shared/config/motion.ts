export const MotionPropsScale = {
    animate: { scale: 1 },
    initial: { scale: 0 },
    exit: { scale: 0 },
} as const;

export const MotionPropsOpacity = {
    initial: { translateX: -200, opacity: 0 },
    animate: { translateX: 0, opacity: 1 },
    exit: { translateX: -200, opacity: 0 },
} as const;
