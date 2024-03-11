import { FC, RefAttributes } from 'react';

import NextLink from 'next/link';
import { LinkProps, Link as PhoqerLink } from 'phoqer';

type LinkAttributes = LinkProps & RefAttributes<HTMLAnchorElement>;
interface Props extends LinkAttributes {
    href: string;
}
export const Link: FC<Props> = ({ children, href, ...props }) => {
    return (
        <NextLink href={href} passHref legacyBehavior>
            <PhoqerLink {...props}>{children}</PhoqerLink>
        </NextLink>
    );
};
