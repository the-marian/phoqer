import { FC, ReactNode } from 'react';

import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { HeaderProps } from 'phoqer-shared';

import { Theme } from '@app/components/layout/theme/theme';
import { useTranslation } from '@app/hook/translations.hook';
import { LANGUAGE_ENUM } from '@app/types/language.type';
import { routes } from '@app/utils/routes';

import css from './layout.module.scss';

const Header = dynamic<HeaderProps>(() => import('phoqer-shared').then(module => module.Header), { ssr: false });
const Footer = dynamic(() => import('phoqer-shared').then(module => module.Footer), { ssr: false });
const Lang = dynamic(() => import('phoqer-shared').then(module => module.Lang), { ssr: false });

const HeaderSearch = dynamic(() => import('./header-search/header-search'), { ssr: false });
const User = dynamic(() => import('./user/user').then(module => module.User), { ssr: false });

interface Props {
    children: ReactNode;
    className?: string;
    withFooter?: boolean;
}

export const Layout: FC<Props> = ({ children, className, withFooter = false }) => {
    const router = useRouter();
    const { t, locale } = useTranslation();

    const goHome = (): void => {
        router.push(routes.home);
    };

    const isAuthorPage = router.pathname.includes('/author');

    return (
        <>
            <Header onLogoClick={goHome} search={<HeaderSearch />} isAuthor={isAuthorPage}>
                <Theme />

                <Lang
                    locale={locale}
                    values={[
                        { locale: LANGUAGE_ENUM.EN, title: t('English') },
                        { locale: LANGUAGE_ENUM.PL, title: t('Polish') },
                        { locale: LANGUAGE_ENUM.UA, title: t('Ukrainian') },
                    ]}
                />

                <User />
            </Header>

            <main className={classNames(css.main, className)}>{children}</main>

            {withFooter && <Footer />}
        </>
    );
};
