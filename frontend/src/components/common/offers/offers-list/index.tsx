import React, { ReactElement } from 'react';

import { createUseStyles } from 'react-jss';

import useMedia from '../../../../hooks/media.hook';
import { IOfferCard } from '../../../../interfaces';
import { Theme } from '../../../../utils/theming/theme';
import OffersLoader from '../../loaders/skeletons/offers';
import EmptyOffers from '../empty-offers';
import OfferCard from '../offers-card';

const useStyles = createUseStyles((theme: Theme) => ({
    gridBig: {
        display: 'grid',
        gridTemplateColumns: theme.fr(4),
        gridGap: theme.rem(4, 2),
        fontSize: theme.rem(1.5),
        fontWeight: theme.text.weight[3],

        ...theme.media(1200).max({
            gridGap: theme.rem(4, 1),
        }),
        ...theme.media(1100).max({
            gridTemplateColumns: theme.fr(3),
        }),
        ...theme.media(960).max({
            gridTemplateColumns: theme.fr(2),
        }),
    },
    gridSmall: {
        display: 'grid',
        gridGap: theme.rem(3, 1.5),
        fontSize: theme.rem(1.5),
        fontWeight: theme.text.weight[3],
        gridTemplateColumns: theme.fr(3),

        ...theme.media(550).max({
            gridTemplateColumns: theme.fr(2),
            maxWidth: theme.rem(45),
            margin: '0 auto',
        }),
    },
    box: {
        margin: 0,
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
    const offerCardBig = useMedia(768);

    return loading ? (
        <OffersLoader amount={offerCardBig ? 4 : 7} />
    ) : (
        <>
            {data?.length ? (
                <>
                    <div className={offerCardBig ? css.gridBig : css.gridSmall}>
                        {data?.map(item => (
                            <OfferCard key={item.id} offer={item} showFavoriteBtn={showFavoriteBtn} />
                        ))}
                    </div>
                </>
            ) : (
                <EmptyOffers />
            )}
            {loadMoreLoading ? <OffersLoader className={css.loading} amount={offerCardBig ? 1 : 4} /> : null}
        </>
    );
};

export default OffersList;
