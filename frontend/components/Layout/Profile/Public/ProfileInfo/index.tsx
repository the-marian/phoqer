import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../assets/theme';
import LikeDislike from '../../../../Common/LikeDislike';
import { modal } from '../../../../Common/Modal';
import MidModalWrp from '../../../../Common/Modal/MidModalWrp';

// test
const percent = 93.21;
const about = `Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат.Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат. Я Влад.
    Акробат. Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат.Я Влад. Акробат.
    
    Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат.Я Влад. Акробат. Я Влад.
    
    Акробат. Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат.Я Влад. Акробат. Я Влад. Акробат.
    Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат.Я Влад.`;

const useStyles = createUseStyles((theme: Theme) => ({
    info: {
        display: 'flex',
        flexWrap: 'wrap',
        fontSize: theme.rem(1.6),
        color: theme.palette.black[0],

        '@media (max-width: 550px)': {
            paddingLeft: theme.rem(0),
            width: '100%',
        },
    },
    flex: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',

        '@media (max-width: 1080px)': {
            flexDirection: 'column-reverse',
        },
    },
    items: {
        width: 'calc(100% - 18rem)',
        marginBottom: theme.rem(1),

        '@media (max-width: 800px)': {
            flexWrap: 'wrap',
            flexDirection: 'column',
            paddingRight: theme.rem(0),
        },
        '@media (max-width: 1080px)': {
            width: '100%',
        },
    },
    gray: {
        color: theme.palette.gray[2],
    },
    yellow: {
        background: theme.palette.yellow[0],
    },
    green: {
        background: theme.palette.green[0],
    },
    percent: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        minWidth: theme.rem(17),
        padding: theme.rem(1, 1.5),
        borderRadius: theme.radius,
        fontSize: theme.rem(3.5),
        fontWeight: theme.text.weight[4],
        color: theme.palette.trueWhite,

        '& span': {
            display: 'block',
            width: '100%',
        },
        '& small': {
            display: 'block',
            fontSize: theme.rem(1.4),
        },

        '@media (max-width: 1080px)': {
            marginBottom: theme.rem(2),
        },
    },

    title: {
        marginBottom: theme.rem(1),
        fontSize: theme.rem(2),
        fontWeight: theme.text.weight[3],
    },
    link: {
        display: 'inline',
        color: theme.palette.primary[0],
        textDecoration: 'underline',
    },
    modal: {
        fontSize: theme.rem(2),
    },
}));

const ProfileInfo = (): ReactElement => {
    const css = useStyles();

    const handleReadMore = (): void => {
        modal.open(
            <MidModalWrp>
                <p className={css.modal} dangerouslySetInnerHTML={{ __html: about.replace(/\n/, '<br>') }} />
            </MidModalWrp>,
        );
    };

    return (
        <div className={css.info}>
            <div className={css.flex}>
                <div className={css.items}>
                    <div>
                        <span className={css.gray}>Соответствие товара с описанием:</span> 5/5
                    </div>
                    <div>
                        <span className={css.gray}>Коммуникация:</span> 5/5
                    </div>
                    <div>
                        <span className={css.gray}>Скорость отклика:</span> в течение часа
                    </div>
                </div>
                <div className={clsx(css.percent, percent > 25 ? css.green : css.yellow)}>
                    <span>{percent} %</span>
                    <small>Позитивных отзывов</small>
                </div>
            </div>

            <LikeDislike like={133} dislike={4} active="like" onClick={console.log} />

            <div>
                <h5 className={css.title}>Об Авторе</h5>
                <p>
                    {about.length > 150 ? about.slice(0, 150) + '... ' : about}
                    {about.length > 150 && (
                        <button type="button" onClick={handleReadMore} className={css.link}>
                            read more
                        </button>
                    )}
                </p>
            </div>
        </div>
    );
};

export default ProfileInfo;
