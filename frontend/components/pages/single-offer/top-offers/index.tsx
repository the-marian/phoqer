import React, { ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import routes from '../../../../assets/routes';
import { Theme } from '../../../../assets/theme';
import { IOfferStatic, IState } from '../../../../interfaces';
import Container from '../../../common/container';
import OffersList from '../../../common/offers/offers-list';
import SectionTitle from '../../../common/section-title';
import Switcher from '../../../common/switcher';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        marginBottom: theme.rem(8),
        maxHeight: theme.rem(2000),
        padding: theme.rem(5, 0, 8),
        background: theme.palette.gray[0],
        fontSize: theme.rem(1.5),
        fontWeight: theme.text.weight[3],
        transition: theme.transitions[1],

        ...theme.media(800).max({
            marginBottom: theme.rem(5),
            padding: theme.rem(5, 0),
        }),

        '&.enter': {
            maxHeight: 0,
            padding: 0,
            marginBottom: 0,
            opacity: 0,
        },
        '&.enter-done': {
            maxHeight: theme.rem(2000),
            marginBottom: theme.rem(8),
            padding: theme.rem(5, 0, 8),
            opacity: 1,

            ...theme.media(800).max({
                marginBottom: theme.rem(5),
                padding: theme.rem(5, 0),
            }),
        },
        '&.exit': {
            maxHeight: 0,
            padding: 0,
            marginBottom: 0,
            opacity: 0,
        },
    },
    checkbox: {
        margin: '3rem auto',
    },
}));

const TopOffers = (): ReactElement => {
    const css = useStyles();

    const [hideTopOffers, setHideTopOffers] = useState<boolean>(false);
    const { data } = useSelector<IState, IOfferStatic>(state => state.offers.popular);

    const handleHide = (): void => {
        setHideTopOffers(val => !val);
    };

    return (
        <>
            <Container className={css.checkbox} id="products">
                <Switcher onClick={handleHide} value={hideTopOffers} off="open" on="close">
                    Скрыть ТОП обьявления
                </Switcher>
            </Container>

            <CSSTransition timeout={600} unmountOnExit in={!hideTopOffers}>
                <div className={css.root}>
                    <Container>
                        <SectionTitle link="Смотреть все" href={routes.offers.single(`?top=true`)}>
                            TOП Объявления
                        </SectionTitle>
                        <OffersList data={data} />
                    </Container>
                </div>
            </CSSTransition>
        </>
    );
};

export default TopOffers;
