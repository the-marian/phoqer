import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import config from '../../../../assets/config';
import { Theme } from '../../../../assets/theme';
import { IOfferCard } from '../../../../interfaces';
import EmptyOffers from '../EmptyOffers';
import OfferCard from '../OffersCard';

const useStyles = createUseStyles((theme: Theme) => ({
    grid: {
        display: 'grid',
        gridTemplateColumns: theme.fr(config.offers.grid.desktop),
        gridGap: theme.rem(8, 3),
        fontSize: theme.rem(1.5),
        fontWeight: theme.text.weight[3],

        '@media (max-width: 1350px)': {
            gridTemplateColumns: theme.fr(config.offers.grid.tablet),
        },
        '@media (max-width: 960px)': {
            gridTemplateColumns: theme.fr(config.offers.grid.smallTablet),
            gridGap: theme.rem(6, 3),
        },
        '@media (max-width: 560px)': {
            gridTemplateColumns: theme.fr(config.offers.grid.mobile),
            maxWidth: theme.rem(45),
            margin: '0 auto',
        },
    },
}));

interface IProps {
    data: IOfferCard[] | null;
}

const OffersList = ({ data }: IProps): ReactElement => {
    const css = useStyles();
    return (
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
