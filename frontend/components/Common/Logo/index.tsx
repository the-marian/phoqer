import clsx from 'clsx';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import routes from '../../../assets/routes';
import { Theme } from '../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    logo: {
        display: 'flex',
        alignItems: 'center',
        height: theme.rem(5),

        '@media (max-width: 500px)': {
            display: 'flex',
            alignItems: 'center',
        },
    },
    center: {
        justifyContent: 'center',
    },
    img: {
        height: 'auto',
        width: theme.rem(10),

        '@media (max-width: 500px)': {
            height: 'auto',
            width: theme.rem(10),
            marginTop: theme.rem(0.4),
        },
    },
}));

interface IProps {
    center?: boolean;
}

const Logo = ({ center = false }: IProps): ReactElement => {
    const css = useStyles();
    return (
        <Link href={routes.root}>
            <a className={clsx(css.logo, center && css.center)}>
                <img className={css.img} src="/logo.png" alt="logo" />
            </a>
        </Link>
    );
};

export default Logo;
