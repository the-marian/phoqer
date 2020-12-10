import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    logo: {
        display: 'block',
        width: 'max-content',
        height: theme.rem(5),
        marginRight: theme.rem(1),

        '@media (max-width: 500px)': {
            display: 'flex',
            alignItems: 'center',
            marginRight: theme.rem(0.5),
        },
    },
    img: {
        height: '100%',
        width: 'auto',

        '@media (max-width: 500px)': {
            height: 'auto',
            width: theme.rem(12),
        },
    },
}));

const Logo = (): ReactElement => {
    const css = useStyles();
    return (
        <Link href="/">
            <a className={css.logo}>
                <img className={css.img} src="/logo.png" alt="logo" />
            </a>
        </Link>
    );
};

export default Logo;
