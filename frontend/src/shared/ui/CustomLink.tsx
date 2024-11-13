interface IPropsCustomLink extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
}

export const CustomLink: FC<IPropsCustomLink> = (props) => {
    return <a {...props}>{props.children}</a>;
};
