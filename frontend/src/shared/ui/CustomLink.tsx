import Link from 'next/link';

interface IPropsCustomLink extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
}

export const CustomLink: FC<IPropsCustomLink> = (props) => {
    return <Link {...props}>{props.children}</Link>;
};
