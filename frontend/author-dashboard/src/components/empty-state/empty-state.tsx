import React from 'react';

import { Link, Button, EmptyState as EmptyStatePhoqer, Title, Text } from 'phoqer';
import { useTranslation } from 'react-i18next';

import { useLinkClick } from 'src/hook/link-click.hook';

import css from './empty-state.module.scss';

interface Props {
    currentPage: number;
    setCurrentPage: (page: number) => void;
}
export const EmptyState = ({ currentPage, setCurrentPage }: Props): JSX.Element => {
    const { t, i18n } = useTranslation();
    const handleClick = useLinkClick();

    const handleReset = (): void => {
        setCurrentPage(1);
    };

    return (
        <EmptyStatePhoqer type="search" className={css.root}>
            <Title>{t('Opsss')}</Title>
            <Text>{t("Looks like you don't have any items here")}</Text>

            <div className="footer">
                {currentPage !== 1 ? (
                    <Button primary onClick={handleReset}>
                        {t('Go to first page')}
                    </Button>
                ) : (
                    <Link outline format="button" href={`/${i18n.language}`} onClick={handleClick}>
                        {t('Go to home page')}
                    </Link>
                )}
            </div>
        </EmptyStatePhoqer>
    );
};
