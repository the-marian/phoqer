import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';
import LinkArrow from '../../Common/LinkArrow';

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
    imgWrp: {
        display: 'flex',
    },
    img: {
        width: theme.rem(8),
        margin: theme.rem(2),
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
            <div className={css.imgWrp}>
                <img className={css.img} src="/emoji/monay2.png" alt="" />
                <img className={css.img} src="/emoji/monay.png" alt="" />
                <img className={css.img} src="/emoji/monay1.png" alt="" />
            </div>

            <h2 className={css.title}>Делитесь с другими и зарабатывайте</h2>
            <div className={css.link}>
                <LinkArrow href="/new_offer/1">Сдать вещи в аренду</LinkArrow>
            </div>
        </div>
    );
};

export default Banner;
