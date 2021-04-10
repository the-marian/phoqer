import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import config from '../../../../assets/config';
import { Theme } from '../../../../assets/theme';
import { IOfferCard } from '../../../../interfaces';
import OffersLoader from '../../preloaders/offers';
import EmptyOffers from '../empty-offers';
import OfferCard from '../offers-card';

const useStyles = createUseStyles((theme: Theme) => ({
    grid: {
        display: 'grid',
        gridTemplateColumns: theme.fr(config.offers.grid.desktop),
        gridGap: theme.rem(8, 3),
        fontSize: theme.rem(1.5),
        fontWeight: theme.text.weight[3],

        ...theme.media(1350).max({
            gridTemplateColumns: theme.fr(config.offers.grid.tablet),
        }),
        ...theme.media(960).max({
            gridTemplateColumns: theme.fr(config.offers.grid.smallTablet),
            gridGap: theme.rem(6, 3),
        }),
        ...theme.media(560).max({
            gridTemplateColumns: theme.fr(config.offers.grid.mobile),
            maxWidth: theme.rem(45),
            margin: '0 auto',
        }),
    },
}));

interface IProps {
    loading?: boolean;
    data: IOfferCard[] | null;
}

const OffersList = ({ loading, data }: IProps): ReactElement => {
    const css = useStyles();
    return loading ? (
        <OffersLoader />
    ) : (
        <>
            {data?.length ? (
                <div className={css.grid}>
                    {data?.map(item => (
                        <OfferCard key={item.id} offer={item} />
                    ))}
                </div>
            ) : (
                <EmptyOffers />
            )}
        </>
    );
};

export default OffersList;
