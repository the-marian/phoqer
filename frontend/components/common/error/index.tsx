import clsx from 'clsx';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import routes from '../../../assets/routes';
import { Theme } from '../../../assets/theme';
import useAuth from '../../../hooks/auth.hook';
import useTrans from '../../../hooks/trans.hook';
import Meta from '../../layout/meta';

const useStyles = createUseStyles((theme: Theme) => ({
    img: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        height: theme.rem(25),
        width: 'auto',

        ...theme.media(1060).max({
            height: theme.rem(15),
        }),
    },
    imgAuth: {
        ...theme.media(1060).max({
            bottom: theme.rem(5),
        }),
    },
    container: {
        margin: theme.rem(2, 0),
        padding: theme.rem(10, 5),
        background: theme.palette.gray[0],
        borderRadius: theme.radius,
    },
    title: {
        fontSize: theme.rem(4),
        fontWeight: theme.text.weight[3],
        color: theme.palette.red[0],
    },
    text: {
        maxWidth: theme.rem(60),
        margin: theme.rem(2, 0, 1),
        fontSize: theme.rem(1.6),
        color: theme.palette.black[0],
    },
    link: {
        fontWeight: theme.text.weight[3],
        fontSize: theme.rem(1.6),
        color: theme.palette.primary[0],
        ...theme.hover({
            textDecoration: 'underline',
        }),
    },
}));

interface IProps {
    title: string;
    text: string;
}

const ErrorComponent = ({ title, text }: IProps): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const auth = useAuth();

    return (
        <>
            <Meta title={title} />
            <div className={css.container}>
                <img className={clsx(css.img, auth?.access_token && css.imgAuth)} src="/no_data.gif" alt="no data" />
                <h2 className={css.title}>{title}</h2>
                <p className={css.text}>{text}</p>
                <Link href={routes.root}>
                    <a className={css.link}>{trans('to_home_page')}</a>
                </Link>
            </div>
        </>
    );
};

export default ErrorComponent;
