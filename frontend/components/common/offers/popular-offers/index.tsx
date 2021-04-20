import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import routes from '../../../../assets/routes';
import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';
import { IOfferStatic, IState } from '../../../../interfaces';
import SectionTitle from '../../section-title';
import OffersList from '../offers-list';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        fontSize: theme.rem(1.5),
        fontWeight: theme.text.weight[3],
    },
    btn: {
        ...template(theme).btn,
        width: theme.rem(25),
        margin: '10rem auto 0',

        ...theme.media(550).max({
            margin: '4rem auto 0',
        }),
    },
}));

const PopularOffers = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const { data } = useSelector<IState, IOfferStatic>(state => state.offers.popular);

    return (
        <div className={css.root}>
            <SectionTitle link={trans('see_all')} href={routes.offers.single(`?top=true`)}>
                {trans('popular_offers')}
            </SectionTitle>

            <OffersList data={data} />

            <Link href={routes.offers.list}>
                <a className={css.btn}>{trans('see_all')}</a>
            </Link>
        </div>
    );
};

export default PopularOffers;
