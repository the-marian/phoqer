// TODO нужно немного поменять структуру папопок
// заменить PablicPage на Profile a в этой папке будут лежать еще две папки Public/Private
// твои компоненты будут в папке Public
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    // TODO убрать
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
    // TODO убрать приставку "user", просто wrp, img ...
    userWrp: {
        width: '35%',
        display: 'flex',
    },
    userImg: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundColor: '#C4C4C4', // TODO используем только цвета, которые лежат в theme.palette, если в макете какой-то другой цвет - не верь ему
    },
    userContent: {
        marginLeft: theme.rem(2),
    },
    userName: {
        fontSize: theme.rem(1.5),
        fontWeight: theme.text.weight[3],
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

// TODO скорее всего этот компонент будет еще много где повторяться, поэтому его лучше перенести в папку Сommon
// TODO я бы назвал UserCard или ProfileCard так не понятно что за юзер
const User = (): ReactElement => {
    const css = useStyles();

    return (
        // TODO убрать этот контейнер
        <div className={css.container}>
            <div className={css.userWrp}>
                <img className={css.userImg} src="/user.jpg" alt="User" />
                <div className={css.userContent}>
                    <div className={css.userName}>Влад Василенко </div>
                    <div className={css.userSubInfo}>
                        {/* TODO не используем <br />, если надо перенос то формируем строчки с тегом <p></p> */}
                        зарегистрирован с января 1970 года
                        <br /> был онлайн 2 часа назад
                    </div>
                    <button className={css.userBtn} type="button">
                        Написать автору
                    </button>
                </div>
            </div>
        </div>
    );
};

export default User;
