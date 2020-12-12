import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import config from '../../../../assets/config';
import { Theme } from '../../../../assets/theme';
import { IOfferPopular } from '../../../../interfaces';
import OffersLoader from '../../Preloaders/OffersLoader';
import OfferCard from '../OffersCard';

const useStyles = createUseStyles((theme: Theme) => ({
    grid: {
        display: 'grid',
        gridTemplateColumns: theme.fr(config.offers.grid.desktop),
        gridGap: theme.rem(8, 4),
        fontSize: theme.rem(1.5),
        fontWeight: theme.text.weight[3],

        '@media (max-width: 1140px)': {
            gridTemplateColumns: theme.fr(config.offers.grid.tablet),
        },
        '@media (max-width: 960px)': {
            gridGap: theme.rem(6, 3),
        },
        '@media (max-width: 560px)': {
            gridTemplateColumns: theme.fr(config.offers.grid.mobile),
            maxWidth: theme.rem(40),
            margin: '0 auto',
        },
    },
}));

const OffersList = ({ data, loading }: IOfferPopular): ReactElement => {
    const css = useStyles();

    return (
        <div className={css.grid}>
            <OffersLoader loading={loading} isEmpty={!data?.length}>
                {data?.map(product => (
                    <OfferCard key={product.id} product={product} />
                ))}
            </OffersLoader>
        </div>
    );
};

export default OffersList;
