import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';
import LinkArrow from '../../Base/LinkArrow';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(8, 0),
        padding: theme.rem(6),
        borderRadius: theme.radius,
        background: theme.palette.soft[0],
        color: theme.palette.black[0],

        '@media (max-width: 550px)': {
            margin: theme.rem(4, 0),
            padding: theme.rem(3),
        },
    },
    title: {
        color: theme.palette.black[0],
        marginBottom: theme.rem(1.5),
        fontSize: theme.rem(3),
        fontWeight: theme.text.weight[5],
    },
    link: {
        fontSize: theme.rem(1.8),
        fontWeight: theme.text.weight[3],
    },
}));

const Banner = (): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.root}>
            <h2 className={css.title}>Делитесь с другими и зарабатывайте</h2>
            <div className={css.link}>
                <LinkArrow href="/new_offer/1">Сдать вещи в аренду</LinkArrow>
            </div>
        </div>
    );
};

export default Banner;
