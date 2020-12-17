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
        marginRight: theme.rem(4),

        '@media (max-width: 500px)': {
            display: 'flex',
            alignItems: 'center',
            marginRight: theme.rem(1.5),
        },
    },
    img: {
        height: 'auto',
        marginTop: theme.rem(0.4),
        width: theme.rem(14),

        '@media (max-width: 500px)': {
            height: 'auto',
            width: theme.rem(10),
            marginTop: theme.rem(0.4),
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
