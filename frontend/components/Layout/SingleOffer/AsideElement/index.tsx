import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { Theme } from '../../../../assets/theme';
import { IOfferCard, IState } from '../../../../interfaces';
import ProfileCard from '../../../Common/ProfileCard';
import Price from '../Price';

const useStyles = createUseStyles((theme: Theme) => ({
    aside: {
        position: 'relative',
        width: theme.rem(40),
        marginTop: theme.rem(1),

        '@media (max-width: 768px)': {
            width: '100%',
        },
    },
    sticky: {
        position: 'sticky',
        top: theme.rem(10),
        left: 0,

        '@media (max-width: 768px)': {
            position: 'static',
        },
    },
}));

const AsideElement = (): ReactElement => {
    const css = useStyles();
    const offer = useSelector<IState, IOfferCard | null>(state => state.offers.single);

    return (
        <aside className={css.aside}>
            <div className={css.sticky}>
                {offer ? <ProfileCard id={offer.author_id} firstName=" " lastName=" " avatar=" " /> : null}
                <Price />
            </div>
        </aside>
    );
};

export default AsideElement;
