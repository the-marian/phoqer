import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import routes from '../../../../assets/routes';
import { Theme } from '../../../../assets/theme';
import { IOfferStatic, IState } from '../../../../interfaces';
import types from '../../../../redux/types';
import CheckTitle from '../../../Common/CheckTitle';
import OffersList from '../../../Common/Offers/OffersList';
import SectionTitle from '../../../Common/SectionTitle';
import Container from '../../Container';

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
    checkbox: {
        margin: '8rem auto 3rem',
    },
}));

const TopOffers = (): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();

    const hideTop = useSelector<IState, boolean>(state => state.config.offers.hideTop);
    const { data } = useSelector<IState, IOfferStatic>(state => state.offers.popular);

    const handleHide = (): void => {
        dispatch({ type: types.OFFERS_HIDE_TOP });
    };

    return (
        <>
            <Container className={css.checkbox}>
                <CheckTitle value={hideTop} onChange={handleHide}>
                    Скрыть ТОП обьявления
                </CheckTitle>
                <hr />
            </Container>

            {hideTop ? null : (
                <div className={css.root} id="products">
                    <Container>
                        <SectionTitle link="Смотреть все" href={routes.offers.single(`?type=popular`)}>
                            TOП Объявления
                        </SectionTitle>
                        <OffersList data={data} />
                    </Container>
                </div>
            )}
        </>
    );
};

export default TopOffers;
