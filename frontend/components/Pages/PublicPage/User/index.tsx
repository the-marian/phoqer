import React, { ReactElement } from 'react';

import { createUseStyles } from 'react-jss';
import { Theme } from '../../../../assets/theme';



const useStyles = createUseStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        width: '100%',
        maxWidth: theme.rem(120),
        margin: '0 auto',

        '@media (max-width: 1300px)': {
            width: '90%',
            maxWidth: 'unset',
        },
    },
    userWrp: {
        width: '35%',
        display: 'flex'
    },
    userImg: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundColor: '#C4C4C4'
    },
    userContent: {
        marginLeft: theme.rem(2),
    },
    userName: {
        fontSize: theme.rem(1.5),
        fontWeight: theme.text.weight[3]
    },
    userSubInfo: {
        color: '#999999',
        marginBottom: theme.rem(2),
    },
    userBtn: {
        width: theme.rem(13),
        height: theme.rem(3),
        fontSize: theme.rem(0.9),
        color: theme.palette.white,
        borderRadius: theme.radius,
        background: theme.palette.primary[0],
    },
}));

const User = (): ReactElement => {

    const css = useStyles();

    return (
            <div className={css.container}>
                <div className={css.userWrp}>
                    <img className={css.userImg} src="/user.jpg" alt="User" />
                    <div className={css.userContent}>
                        <div className={css.userName}>Влад Василенко </div>
                        <div className={css.userSubInfo}>зарегистрирован с января 1970 года<br /> был онлайн 2 часа назад</div>
                        <button className={css.userBtn}>Написать автору</button>
                    </div>
                </div>
            </div>

    )
};

export default User;