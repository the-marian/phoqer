import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import config from '../../../../assets/config';
import useMedia from '../../../../hooks/media.hook';
import { IOfferCard } from '../../../../interfaces';
import { Theme } from '../../../../theming/theme';
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
    loading: {
        marginTop: theme.rem(5),
    },
}));

interface IProps {
    loading?: boolean;
    loadMoreLoading?: boolean;
    showFavoriteBtn?: boolean;
    data: IOfferCard[] | null;
}

const OffersList = ({ loading, loadMoreLoading = false, data, showFavoriteBtn = true }: IProps): ReactElement => {
    const css = useStyles();
    const media = useMedia(1400);

    return loading ? (
        <>
            <OffersLoader amount={media ? 4 : 1} />
            {media && <OffersLoader className={css.loading} amount={media ? 4 : 1} />}
        </>
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
            {loadMoreLoading ? <OffersLoader className={css.loading} amount={media ? 4 : 1} /> : null}
        </>
    );
};

export default OffersList;
