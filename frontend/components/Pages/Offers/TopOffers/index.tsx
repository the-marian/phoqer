import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import router from '../../../../assets/router';
import { Theme } from '../../../../assets/theme';
import { IOfferPopular, IState } from '../../../../interfaces';
import OffersList from '../../../Common/Offers/OffersList';
import SectionTitle from '../../../Layout/SectionTitle';
import Container from '../../../Layout/Container';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        marginBottom: theme.rem(8),
        padding: theme.rem(5, 0, 8),
        background: theme.palette.gray[0],
        fontSize: theme.rem(1.5),
        fontWeight: theme.text.weight[3],

        '@media (max-width: 800px)': {
            marginBottom: theme.rem(5),
            padding: theme.rem(5, 0),
        },
    },
}));

const TopOffers = (): ReactElement => {
    const css = useStyles();
    const { data, loading } = useSelector<IState, IOfferPopular>(state => state.offers.popular);

    return (
        <div className={css.root}>
            <Container>
                <SectionTitle link="Смотреть все" href={`${router.offers}?type=popular`}>
                    TOП Объявления
                </SectionTitle>

                <OffersList data={data} loading={loading} />
            </Container>
        </div>
    );
};

export default TopOffers;
