import clsx from 'clsx';
import React, { Fragment, ReactElement, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import template from '../../../../../../../assets/template';
import { Theme } from '../../../../../../../assets/theme';
import useMedia from '../../../../../../../hooks/media.hook';
import useMonths from '../../../../../../../hooks/month.hook';
import { IMessagesList, IPublicProfile, IState } from '../../../../../../../interfaces';
import Tooltip from '../../../../../../common/tooltip';
import ChatInitConversation from '../chat-init-conversation';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        flexGrow: 2,
        height: '100%',
        width: '100%',
        marginBottom: theme.rem(1),
        borderRadius: theme.radius,
        background: theme.palette.gray[0],
        overflow: 'auto',

        ...theme.media(1060).max({
            borderRadius: '0',
        }),
    },
    inner: {
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'flex-start',
        minHeight: 'calc(100vh - 14rem)',
        padding: theme.rem(4, 1, 1),

        ...theme.media(1060).max({
            padding: theme.rem(2, 1.5, 4),
        }),
    },
    messages: {
        width: 'max-content',
        maxWidth: '60%',
        margin: theme.rem(0.5, 1),
    },
    right: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        textAlign: 'right',
    },
    box: {
        width: 'max-content',
        padding: theme.rem(1, 2),
        background: theme.palette.white,
        borderRadius: theme.radius,
        boxShadow: theme.shadow[1],
        ...template(theme).outline,
    },
    primary: {
        background: theme.palette.primary[0],
        color: theme.palette.trueWhite,
        ...theme.hover({
            opacity: '0.7',
        }),
    },
    date: {
        margin: theme.rem(0.2, 0, 0.2, 0.4),
        color: theme.palette.gray[2],
        fontSize: theme.rem(1.2),
    },
    day: {
        width: '100%',
        marginTop: theme.rem(4),
        textAlign: 'center',
    },
    tooltip: {
        width: 'max-content',
    },
}));

const validateDate = (value: string): Date => {
    try {
        return new Date(value);
    } catch (error) {
        return new Date();
    }
};

const formatTime = (value: string): string => {
    const date = validateDate(value);
    return `${date.getHours()}:${date.getMinutes()}`;
};

interface IDateSeparatorProps {
    prevDate?: string;
    currentDate: string;
}

const DateSeparator = ({ prevDate, currentDate }: IDateSeparatorProps): ReactElement | null => {
    const css = useStyles();
    const month = useMonths();

    const currentDay = validateDate(currentDate);
    if (!prevDate) {
        return (
            <p className={css.day}>
                {currentDay.getDate()} {month[currentDay.getMonth()]}
            </p>
        );
    }

    const prevDay = validateDate(prevDate);
    return prevDay.getDate() !== currentDay.getDate() ? (
        <p className={css.day}>
            {currentDay.getDate()} {month[currentDay.getMonth()]}
        </p>
    ) : null;
};

interface IProps {
    children?: ReactElement;
}

const ChatFlow = ({ children }: IProps): ReactElement => {
    const css = useStyles();
    const media = useMedia(1060);
    const ref = useRef<HTMLDivElement | null>(null);

    const user = useSelector<IState, IPublicProfile>(state => state.user);
    const messages = useSelector<IState, IMessagesList>(state => state.chat.messages);

    useEffect(() => {
        if (ref.current) {
            media
                ? ref.current?.scrollTo({ top: ref.current?.offsetHeight || 0 })
                : window.scrollTo({ top: ref.current?.offsetHeight || 0 });
        }
    }, [ref.current]);

    return (
        <div ref={ref} className={css.root}>
            <div className={css.inner}>
                {messages.data.data.length
                    ? messages.data.data.map<ReactElement>((item, index, array) => (
                          <Fragment key={item.id}>
                              <div className={clsx(css.messages, user.id === item.user_id && css.right)}>
                                  {array[index + 1]?.user_id !== item.user_id && (
                                      <p className={css.date}>{formatTime(item.creation_datetime)}</p>
                                  )}

                                  <Tooltip className={css.tooltip} content={`${item.first_name} ${item.last_name}`}>
                                      <button type="button" className={clsx(css.box, user.id === item.user_id && css.primary)}>
                                          {item.text}
                                      </button>
                                  </Tooltip>
                              </div>
                              <DateSeparator
                                  prevDate={array[index + 1]?.creation_datetime}
                                  currentDate={item.creation_datetime}
                              />
                          </Fragment>
                      ))
                    : null}
                <ChatInitConversation>{children}</ChatInitConversation>
            </div>
        </div>
    );
};

export default ChatFlow;
