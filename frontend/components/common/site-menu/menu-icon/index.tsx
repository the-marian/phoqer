import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    icon: {
        position: 'relative',
        height: theme.rem(3),
        width: theme.rem(2),
        marginRight: theme.rem(1),
        overflow: 'hidden',

        '& span': {
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            transform: 'translateY(-50%)',
            height: theme.rem(0.2),
            background: theme.palette.black[0],
            transition: '0.3s ease-in-out',

            '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: 0,
                width: '100%',
                transform: 'translate(-140%, -50%)',
                height: theme.rem(0.2),
                background: theme.palette.primary[0],
            },

            '&:nth-of-type(1)': {
                top: '30%',
            },

            '&:nth-of-type(2)': {
                transition: '0.3s ease-in-out 0.1s',
            },

            '&:nth-of-type(3)': {
                top: '70%',
                transition: '0.3s ease-in-out 0.2s',
            },
        },
    },
}));

const MenuIcon = (): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.icon}>
            <span />
            <span />
            <span />
        </div>
    );
};

export default MenuIcon;
