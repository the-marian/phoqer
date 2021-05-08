import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import config from '../../../assets/config';
import { Theme } from '../../../assets/theme';
import useTrans from '../../../hooks/trans.hook';
import Meta from '../../layout/meta';

const useStyles = createUseStyles((theme: Theme) => ({
    container: {
        margin: theme.rem(2, 0),
        padding: theme.rem(5),
        background: theme.palette.gray[0],
        borderRadius: theme.radius,
    },
    title: {
        fontSize: theme.rem(3),
        fontWeight: theme.text.weight[3],
        color: theme.palette.red[0],
    },
    text: {
        margin: theme.rem(2, 0, 1),
        fontSize: theme.rem(1.6),
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

const ErrorComponent = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const { locale } = useRouter();

    return (
        <>
            <Meta title="Error" />
            <div className={css.container}>
                <h2 className={css.title}>Ой...</h2>
                <p className={css.text}>{trans('error')}</p>
                <a className={css.link} href={config.host(locale)}>
                    {trans('reload')}
                </a>
            </div>
        </>
    );
};

export default ErrorComponent;
