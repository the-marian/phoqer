import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import router from '../../../assets/router';
import { Theme } from '../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    logo: {
        display: 'flex',
        alignItems: 'center',
        height: theme.rem(5),
        marginRight: theme.rem(1),

        '@media (max-width: 500px)': {
            display: 'flex',
            alignItems: 'center',
            marginRight: theme.rem(0.5),
        },
    },
    img: {
        height: 'auto',
        width: theme.rem(8.6),

        '@media (max-width: 500px)': {
            height: 'auto',
        },
    },
}));

const Logo = (): ReactElement => {
    const css = useStyles();
    return (
        <Link href={router.root}>
            <a className={css.logo}>
                <img className={css.img} src="/logo.png" alt="logo" />
            </a>
        </Link>
    );
};

export default Logo;
