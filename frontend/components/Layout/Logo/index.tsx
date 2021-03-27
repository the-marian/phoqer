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

        ...theme.media(500).max({
            display: 'flex',
            alignItems: 'center',
        }),
    },
    center: {
        justifyContent: 'center',
    },
    img: {
        height: 'auto',
        width: theme.rem(10),
        marginBottom: theme.rem(0.1),

        ...theme.media(500).max({
            height: 'auto',
            width: theme.rem(10),
        }),
    },
}));

interface IProps {
    className?: string;
    link?: boolean;
    center?: boolean;
}

const Logo = ({ center = false, link = false, className }: IProps): ReactElement => {
    const css = useStyles();
    return link ? (
        <Link href={routes.root}>
            <a className={clsx(css.logo, center && css.center, className)}>
                <img className={css.img} src="/logo.png" alt="logo" />
            </a>
        </Link>
    ) : (
        <div className={clsx(css.logo, center && css.center, className)}>
            <img className={css.img} src="/logo.png" alt="logo" />
        </div>
    );
};

export default Logo;
