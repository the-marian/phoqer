import React from 'react';

import { createUseStyles } from 'react-jss';

import { useRecentOffers } from '../../../../hooks/recent-offers.hook';
import { Theme } from '../../../../utils/theming/theme';

import RecentOffersItem from './recent-offers-item';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        marginTop: theme.rem(10),
    },
    title: {
        marginBottom: theme.rem(2.5),
        fontSize: theme.rem(2),
        color: theme.palette.primary[0],
        fontWeight: theme.text.weight[4],
    },
    wrapper: {
        display: 'grid',
        gridTemplateColumns: theme.fr(4),
        gridGap: theme.rem(4, 2),

        ...theme.media(1200).max({
            gridGap: theme.rem(4, 1),
        }),
        ...theme.media(1100).max({
            gridTemplateColumns: theme.fr(3),
        }),
        ...theme.media(960).max({
            gridTemplateColumns: theme.fr(2),
        }),

        ...theme.media(768).max({
            gridTemplateColumns: theme.fr(3),
        }),

        ...theme.media(550).max({
            gridTemplateColumns: theme.fr(2),
        }),
    },
}));

const RecentOffers = (): JSX.Element => {
    const css = useStyles();
    const storage = useRecentOffers();
    const offers = storage.get();

    return (
        <>
            {offers.length ? (
                <div className={css.root}>
                    <h2 className={css.title}>Недавно просмотренные объявления</h2>

                    <div className={css.wrapper}>
                        {offers.map(item => (
                            <RecentOffersItem key={item.id} offer={item} />
                        ))}
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default RecentOffers;
