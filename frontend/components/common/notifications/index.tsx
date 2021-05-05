import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { ReactNotificationOptions, store } from 'react-notifications-component';

import { timeIndicator } from '../../../assets/helpers';
import { Theme } from '../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    title: {
        display: 'flex',
        alignItems: 'center',
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[3],
        color: theme.palette.trueBlack,
    },
    errorTitle: {
        color: theme.palette.red[0],
    },
    indicator: {
        display: 'block',
        height: theme.rem(1.8),
        width: theme.rem(1.8),
        marginRight: theme.rem(1),
        borderRadius: theme.radius,
        background: theme.palette.gray[1],
    },
    date: {
        marginBottom: theme.rem(0.2),
        fontSize: theme.rem(1.2),
        color: theme.palette.gray[4],
        fontWeight: theme.text.weight[3],
    },
    info: {
        background: theme.palette.green[0],
    },
    error: {
        background: theme.palette.red[0],
    },
    warning: {
        background: theme.palette.yellow[0],
    },
}));

interface IProps {
    title: string;
    date?: number | string | Date;
    type: 'info' | 'error' | 'warning';
}

const Title = ({ title, date, type }: IProps): ReactElement => {
    const css = useStyles();
    const { locale } = useRouter();

    return (
        <div>
            {date && <p className={css.date}>{timeIndicator({ initDate: date, locale })}</p>}
            <h2 className={clsx(css.title, type === 'error' && css.errorTitle)}>
                <span className={clsx(css.indicator, css[type])} />
                <span>{title}</span>
            </h2>
        </div>
    );
};

const defaultOptions: ReactNotificationOptions = {
    type: 'success',
    insert: 'bottom',
    container: 'bottom-right',
    slidingEnter: {
        duration: 300,
        timingFunction: 'ease-out',
        delay: 0,
    },
    slidingExit: {
        duration: 300,
        timingFunction: 'ease-out',
        delay: 0,
    },
    dismiss: {
        duration: 5_000_000,
        showIcon: true,
        click: false,
    },
    touchSlidingExit: {
        swipe: {
            duration: 300,
            timingFunction: 'ease-out',
            delay: 0,
        },
        fade: {
            duration: 300,
            timingFunction: 'ease-out',
            delay: 0,
        },
    },
};

interface IParams {
    title?: string;
    date?: number | string | Date;
    message?: string | ReactElement;
    options?: { [key: string]: string | number | ReactElement };
}

const notifications = {
    info: ({ title = 'Success', message = '...', date = new Date(), options }: IParams): void => {
        store.addNotification({
            ...defaultOptions,
            type: 'success',
            title: <Title type="info" date={date} title={title} />,
            message,
            ...(options || {}),
        });
    },
    error: ({ title = 'Error', message = '...', date = new Date(), options }: IParams): void => {
        store.addNotification({
            ...defaultOptions,
            type: 'danger',
            title: <Title type="error" date={date} title={title} />,
            message,
            ...(options || {}),
        });
    },
    warning: ({ title = 'Attention', message = '...', date = new Date(), options }: IParams): void => {
        store.addNotification({
            ...defaultOptions,
            type: 'warning',
            title: <Title type="warning" date={date} title={title} />,
            message,
            ...(options || {}),
        });
    },
};

export default notifications;
