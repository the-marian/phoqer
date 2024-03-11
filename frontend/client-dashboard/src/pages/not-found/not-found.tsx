import React from 'react';

import { EmptyState, Link } from 'phoqer';
import { useTranslation } from 'react-i18next';

import { SubHeader } from 'src/components/sub-header/sub-header';
import { useLinkClick } from 'src/hook/link-click.hook';

import css from './not-found.module.scss';

const NotFound = (): JSX.Element => {
    const { t, i18n } = useTranslation();
    const handleClick = useLinkClick();

    return (
        <>
            <SubHeader />
            <EmptyState className={css.empty}>
                <h1>{t('Not found')}</h1>
                <p>{t("It looks like this page doesn't exist")}</p>

                <div className="footer">
                    <Link primary format="button" href={`/${i18n.language}/client`} onClick={handleClick}>
                        {t('Go to home page')}
                    </Link>
                </div>
            </EmptyState>
        </>
    );
};

export default NotFound;
