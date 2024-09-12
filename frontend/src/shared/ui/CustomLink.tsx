export const CustomLink: FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
    return <a {...props}>{props.children}</a>;
};
