import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import template from '../../../assets/template';
import { Theme } from '../../../assets/theme';
import useTrans from '../../../hooks/trans.hook';

const useStyles = createUseStyles((theme: Theme) => ({
    top: {
        maxWidth: theme.rem(80),
        width: '90%',
        height: '100%',
        margin: '5rem auto',
        padding: theme.rem(10),
        borderRadius: theme.radius,
        background: theme.palette.secondary[0],
        fontSize: theme.rem(1.6),
        textAlign: 'center',
        color: theme.palette.black[0],

        '& h2': {
            margin: theme.rem(4, 0, 2),
        },

        ...theme.media(460).max({
            padding: theme.rem(6, 3),
        }),
    },
    img: {
        height: theme.rem(10),
        width: theme.rem(10),
        margin: '0 auto',
    },
    btn: {
        ...template(theme).btn,
        margin: '5rem auto 0',
        padding: theme.rem(1, 8),

        ...theme.media(470).max({
            margin: '2rem auto 0',
            padding: theme.rem(1, 4),
        }),
    },
}));

const Advertising = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();

    return (
        <div className={css.top}>
            <img className={css.img} src="/emoji/top.png" alt="" />
            <h2>Выводите товар в топ на месяц абсолютно бесплатно</h2>
            <p>
                Ляля тополя ляля тополя тополя ляля тополя тополя ляля тополя тополя ляля тополя. Тополя ляля тополя тополя ляля
                тополя.
            </p>

            <button className={css.btn} type="button">
                {trans('details')}
            </button>
        </div>
    );
};

export default Advertising;
