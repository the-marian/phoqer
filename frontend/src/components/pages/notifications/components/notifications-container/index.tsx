import React, { ReactElement } from 'react';

import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    aside: {
        position: 'relative',
        width: theme.rem(35),

        ...theme.media(1060).max({
            display: 'none',
        }),
    },
    sticky: {
        position: 'sticky',
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        height: theme.rem(43),
        borderRadius: theme.radius,
        background: theme.palette.gray[0],
        color: theme.palette.gray[3],
        fontWeight: theme.text.weight[3],
        fontSize: theme.rem(1.6),
    },
    img: {
        height: theme.rem(15),
        width: theme.rem(15),
        objectFit: 'contain',
        marginBottom: theme.rem(4),
    },
    inner: {
        width: 'calc(100% - 37rem)',

        ...theme.media(1060).max({
            width: '100%',
        }),
    },
}));

interface IProps {
    children: ReactElement;
}

const NotificationsContainer = ({ children }: IProps): ReactElement => {
    const css = useStyles();

    return (
        <div className={css.root}>
            <aside className={css.aside}>
                <div className={css.sticky}>
                    <img className={css.img} src="/icons/bell.png" alt="" />
                    <p>Ваши уведомления</p>
                </div>
            </aside>
            <div className={css.inner}>{children}</div>
        </div>
    );
};

export default NotificationsContainer;
