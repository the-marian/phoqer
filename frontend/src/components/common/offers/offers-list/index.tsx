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
        gridGap: theme.rem(8, 3),
        fontSize: theme.rem(1.5),
        fontWeight: theme.text.weight[3],

        ...theme.media(1350).max({
            gridTemplateColumns: theme.fr(3),
        }),
        ...theme.media(960).max({
            gridTemplateColumns: theme.fr(2),
            gridGap: theme.rem(6, 3),
        }),
        ...theme.media(680).max({
            gridTemplateColumns: theme.fr(1),
            maxWidth: theme.rem(45),
            margin: '0 auto',
        }),
    },
    gridSmall: {
        display: 'grid',
        gridTemplateColumns: theme.fr(6),
        gridGap: theme.rem(3, 1.5),
        fontSize: theme.rem(1.5),
        fontWeight: theme.text.weight[3],

        ...theme.media(1150).max({
            gridTemplateColumns: theme.fr(5),
        }),
        ...theme.media(960).max({
            gridTemplateColumns: theme.fr(4),
            gridGap: theme.rem(3, 1.5),
        }),
        ...theme.media(900).max({
            gridTemplateColumns: theme.fr(3),
        }),
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
