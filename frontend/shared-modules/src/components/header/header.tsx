import { FC, MouseEvent, ReactNode } from 'react';

import { LogoIcon, Container, Text } from 'phoqer';

import css from './header.module.scss';

export interface HeaderProps {
    onLogoClick?: (path: string) => void;
    children?: ReactNode;
    search?: ReactNode;
    isAuthor?: boolean;
}

export const Header: FC<HeaderProps> = ({ search, children, onLogoClick, isAuthor = false }) => {
    const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();

        if (onLogoClick) {
            onLogoClick('/');
        }
    };

    return (
        <header className={css.header}>
            <Container size="lg" className={css.container}>
                <div className={css.inner}>
                    {isAuthor && <Text className={css.author}>Author</Text>}

                    <a className={css.logo} href="/" onClick={handleLogoClick} title="Phoqer" aria-label="Phoqer">
                        <LogoIcon />
                    </a>

                    {search}
                </div>

                <div className={css.inner}>{children}</div>
            </Container>
        </header>
    );
};
