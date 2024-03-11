import React, { useEffect, useState } from 'react';

import { Skeleton, Title, TypographySize, useCurrency } from 'phoqer';
import { useTranslation } from 'react-i18next';

import { metaService } from 'src/services/meta.service';
import { AuthorMeta } from 'src/types/meta.type';

import css from './stats.module.scss';

interface Props {
    value?: number | string | null;
}
const Cell = ({ value }: Props): JSX.Element => {
    return <>{value || <Skeleton style={{ width: '12rem', height: '6rem' }} color="blue" />}</>;
};

export const Stats = (): JSX.Element => {
    const { t, i18n } = useTranslation();
    const currency = useCurrency();

    const [metaData, setMetaData] = useState<AuthorMeta | null>(null);

    useEffect(() => {
        metaService.getAuthorMeta().then(setMetaData);
    }, []);

    return (
        <ul className={css.ul}>
            <li className={css.card}>
                <Title as="h4" size={TypographySize.SX} className={css.title}>
                    {t('You have earned')}
                </Title>
                <div className={css.number}>
                    <Cell value={metaData?.income ? currency.format(metaData.income, i18n.language) : null} />
                </div>
            </li>
            <li className={css.card}>
                <Title as="h4" size={TypographySize.SX} className={css.title}>
                    {t('Your offers')}
                </Title>
                <div className={css.number}>
                    <Cell value={metaData?.offers} />
                </div>
            </li>
            <li className={css.card}>
                <Title as="h4" size={TypographySize.SX} className={css.title}>
                    {t('Rental requests')}
                </Title>
                <div className={css.number}>
                    <Cell value={metaData?.totalRequests} />
                </div>
            </li>
            <li className={css.card}>
                <Title as="h4" size={TypographySize.SX} className={css.title}>
                    {t('Average score')}
                </Title>
                <div className={css.number}>
                    <Cell value={metaData?.averageScore} />
                </div>
            </li>
        </ul>
    );
};
