import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import config from '../../../../assets/config';
import { Theme } from '../../../../assets/theme';
import { IOfferCard } from '../../../../interfaces';
import OffersLoader from '../../loaders/skeletons/offers';
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
        ...theme.media(680).max({
            gridTemplateColumns: theme.fr(config.offers.grid.mobile),
            maxWidth: theme.rem(45),
            margin: '0 auto',
        }),
    },
}));

interface IProps {
    loading?: boolean;
    showFavoriteBtn?: boolean;
    data: IOfferCard[] | null;
}

const OffersList = ({ loading, data, showFavoriteBtn = true }: IProps): ReactElement => {
    const css = useStyles();
    return loading ? (
        <OffersLoader amount={4} />
    ) : (
        <>
            {data?.length ? (
                <div className={css.grid}>
                    {data?.map(item => (
                        <OfferCard key={item.id} offer={item} showFavoriteBtn={showFavoriteBtn} />
                    ))}
                </div>
            ) : (
                <EmptyOffers />
            )}
        </>
    );
};

export default OffersList;
