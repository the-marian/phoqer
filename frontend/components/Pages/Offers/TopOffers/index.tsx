import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import routes from '../../../../assets/routes';
import { Theme } from '../../../../assets/theme';
import { IOfferStatic, IState } from '../../../../interfaces';
import OffersList from '../../../Common/Offers/OffersList';
import Container from '../../../Layout/Container';
import SectionTitle from '../../../Layout/SectionTitle';

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
    const { data } = useSelector<IState, IOfferStatic>(state => state.offers.popular);

    return (
        <div className={css.root}>
            <Container>
                <SectionTitle link="Смотреть все" href={routes.offers.single(`?type=popular`)}>
                    TOП Объявления
                </SectionTitle>
                <OffersList data={data} />
            </Container>
        </div>
    );
};

export default TopOffers;
