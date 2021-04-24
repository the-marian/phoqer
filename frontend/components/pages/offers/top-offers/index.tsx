import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import routes from '../../../../assets/routes';
import { Theme } from '../../../../assets/theme';
import useConfig from '../../../../hooks/config.hook';
import useTrans from '../../../../hooks/trans.hook';
import { IOfferStatic, IState } from '../../../../interfaces';
import OffersList from '../../../common/offers/offers-list';
import SectionTitle from '../../../common/section-title';
import Switcher from '../../../common/switcher';
import Container from '../../../layout/container';

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
    const trans = useTrans();
    const [config, setConfig] = useConfig();
    const { data } = useSelector<IState, IOfferStatic>(state => state.offers.popular);

    const handleHide = (): void => {
        setConfig({ ...config, hideTopOffers: !config.hideTopOffers });
    };

    return (
        <>
            <Container className={css.checkbox} id="products">
                <Switcher onClick={handleHide} value={config.hideTopOffers} off="open" on="close">
                    {config.hideTopOffers ? trans('show_top_offers') : trans('hide_top_offers')}
                </Switcher>
            </Container>

            <CSSTransition timeout={600} unmountOnExit in={!config.hideTopOffers}>
                <div className={css.root}>
                    <Container>
                        <SectionTitle link={trans('see_all')} href={routes.offers.single(`?top=true`)}>
                            {trans('top_offers')}
                        </SectionTitle>
                        <OffersList data={data} />
                    </Container>
                </div>
            </CSSTransition>
        </>
    );
};

export default TopOffers;
