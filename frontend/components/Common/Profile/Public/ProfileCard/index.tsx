import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({

    wrp: {
        width: '35%',
        display: 'flex',
        '@media (max-width: 767px)': {
            width: '70%',
        },
        '@media (max-width: 550px)': {
            marginBottom: theme.rem(3),
            alignItems: 'center',
            width: '100%',
        },
    },
    img: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundColor: theme.palette.gray[2]
    },
    content: {
        marginLeft: theme.rem(2),
    },
    name: {
        fontSize: theme.rem(1.5),
        fontWeight: theme.text.weight[3],
    },
    info: {
        color: theme.palette.gray[2],
        marginBottom: theme.rem(2),
    },
    btn: {
        width: theme.rem(13),
        height: theme.rem(3),
        fontSize: theme.rem(0.9),
        color: theme.palette.white,
        borderRadius: theme.radius,
        background: theme.palette.primary[0],
    },
}));

const ProfileCard = (): ReactElement => {
    const css = useStyles();

    return (
        <div className={css.wrp}>
            <img className={css.img} src="/user.jpg" alt="User" />
            <div className={css.content}>
                <div className={css.name}>Влад Василенко </div>
                <div className={css.info}>
                    зарегистрирован с января 1970 года
                        <p> был онлайн 2 часа назад</p>
                </div>
                <button className={css.btn} type="button">
                    Написать автору
                    </button>
            </div>
        </div>
    );
};

export default ProfileCard;
