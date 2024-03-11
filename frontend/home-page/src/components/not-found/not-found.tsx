import { FC, PropsWithChildren } from 'react';

import NextLink from 'next/link';
import { EmptyState, Link, Heading } from 'phoqer';

import { useTranslation } from '@app/hook/translations.hook';
import { routes } from '@app/utils/routes';

import css from './not-found.module.scss';

export const NotFound: FC<PropsWithChildren> = ({ children }) => {
    const { t } = useTranslation();

    return (
        <EmptyState className={css.root}>
            <Heading size="md">{t('Not Found')}</Heading>
            {children}

            <div className="footer">
                <NextLink href={routes.home} passHref legacyBehavior>
                    <Link size="sm" variant="secondary">
                        {t('Go home')}
                    </Link>
                </NextLink>

                <NextLink href={routes.search()} passHref legacyBehavior>
                    <Link size="sm" variant="primary">
                        {t('Search offers')}
                    </Link>
                </NextLink>
            </div>
        </EmptyState>
    );
};
