import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';
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

    return (
        <aside className={css.aside}>
            <div className={css.sticky}>
                <ProfileCard id={1} firstName="Влад" lastName="Василенко" />
                <Price />
            </div>
        </aside>
    );
};

export default AsideElement;
