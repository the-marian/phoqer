import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import routes from '../../../../assets/routes';
import { Theme } from '../../../../assets/theme';
import LinkArrow from '../../../Layout/LinkArrow';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(14, 0),
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
        width: theme.rem(10),
        margin: theme.rem(0, 2, 2, 0),

        '@media (max-width: 650px)': {
            width: theme.rem(4.5),
        },
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
                <img className={css.img} src="/emoji/monay.png" alt="" />
                <img className={css.img} src="/emoji/monay.png" alt="" />
                <img className={css.img} src="/emoji/monay.png" alt="" />
            </div>

            <h2 className={css.title}>Делитесь с другими и зарабатывайте</h2>
            <div className={css.link}>
                <LinkArrow href={routes.new_offer()} as={routes.new_offer(1)}>
                    Сдать вещи в аренду
                </LinkArrow>
            </div>
        </div>
    );
};

export default Banner;
