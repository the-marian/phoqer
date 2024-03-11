import { FC } from 'react';

import { EmptyState, Text, Heading } from 'phoqer';

import { Link } from '@app/components/common/link/link';
import { useTranslation } from '@app/hook/translations.hook';
import { routes } from '@app/utils/routes';

import css from './header-search-tabs.module.scss';

export const HeaderSearchNotFound: FC = () => {
    const { t } = useTranslation();

    return (
        <EmptyState type="search" className={css.empty}>
            <Heading as="h2" size="sm">
                {t('Opss! We did not find anything.')}
            </Heading>
            <Text>{t('Try to chang your search query or select other tab')}</Text>
            <div className="footer">
                <Link variant="secondary" href={routes.categories.list}>
                    {t('Search offers')}
                </Link>
            </div>
        </EmptyState>
    );
};
