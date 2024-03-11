import { FC } from 'react';

import { Link, Button, EmptyState as EmptyStatePhoqer, Heading, Text } from 'phoqer';
import { useOrdersContext } from 'phoqer-shared';

import { useTranslation } from '@app/hook/translations.hook';

import css from './empty-state.module.scss';

export const EmptyState: FC = () => {
    const { t, locale } = useTranslation();

    const { currentPage, setCurrentPage } = useOrdersContext();
    const handleReset = (): void => {
        setCurrentPage(1);
    };

    return (
        <EmptyStatePhoqer type="search" className={css.root}>
            <Heading>{t('Opsss')}</Heading>
            <Text>{t("Looks like you don't have any favorite offers here")}</Text>

            <div className="footer">
                {currentPage !== 1 ? (
                    <Button size="sm" variant="primary" onClick={handleReset}>
                        {t('Go to first page')}
                    </Button>
                ) : (
                    <Link size="sm" variant="secondary" href={`/${locale}`}>
                        {t('Go to home page')}
                    </Link>
                )}
            </div>
        </EmptyStatePhoqer>
    );
};
