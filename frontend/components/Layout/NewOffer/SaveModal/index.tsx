import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import routes from '../../../../assets/routes';
import { Theme } from '../../../../assets/theme';
import SmallModalWrp from '../../../Common/Modal/SmallModalWrp';

const useStyles = createUseStyles((theme: Theme) => ({
    success: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',

        '& svg': {
            width: theme.rem(5),
            height: theme.rem(5),

            '& circle': {
                fill: theme.palette.green,
            },
        },
    },
    title: {
        fontSize: theme.rem(1.8),
        fontWeight: theme.text.weight[3],
        maxWidth: theme.rem(40),
        margin: '2rem auto',
        color: theme.palette.green,
    },
    text: {
        maxWidth: theme.rem(40),
        margin: '0 auto',
        fontSize: theme.rem(1.6),
    },
    link: {
        margin: theme.rem(3),
        fontSize: theme.rem(1.6),
        color: theme.palette.primary[0],
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));

const SaveModal = (): ReactElement => {
    const css = useStyles();
    return (
        <SmallModalWrp>
            <div className={css.success}>
                <svg viewBox="0 0 76 76">
                    <circle cx={38} cy={38} r={36} />
                    <path
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth={5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        d="M17.7,40.9l10.9,10.9l28.7-28.7"
                    />
                </svg>

                <h2 className={css.title}>Ваше объявление сохранено</h2>

                <p className={css.text}>Вы можете в любое время вернутся к его заполнению</p>

                <Link href={routes.root}>
                    <a className={css.link}>Перейти на главную</a>
                </Link>
            </div>
        </SmallModalWrp>
    );
};

export default SaveModal;
