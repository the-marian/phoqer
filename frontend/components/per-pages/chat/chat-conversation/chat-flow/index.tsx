import clsx from 'clsx';
import React, { Fragment, ReactElement, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import useMedia from '../../../../../hooks/media.hook';
import useMonths from '../../../../../hooks/month.hook';
import { IMessages, IMessagesList, IPublicProfile, IState } from '../../../../../interfaces';
import { addZeroToNumber } from '../../../../../utils/helpers';
import mixin from '../../../../../utils/theming/mixin';
import { Theme } from '../../../../../utils/theming/theme';
import { modal } from '../../../../common/modal';
import FullPageGallery from '../../../../common/modal/full-page-gallery';
import Tooltip from '../../../../common/tooltip';
import ChatEmpty from '../../components/chat-empty';
import ChatInitConversation from '../chat-init-conversation';
import ChatUserModal from '../chat-user-modal';
import { createHTML, formatTime, validateDate } from './chat-flow.utils';

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
        maxWidth: '80%',
        margin: theme.rem(0.2, 1),
    },
    right: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
    },
    box: {
        width: 'max-content',
        maxWidth: '100%',
        padding: theme.rem(1, 2),
        borderRadius: theme.radius,
        boxShadow: theme.shadow[1],
        background: theme.palette.trueWhite,
        color: theme.palette.trueBlack,
        wordWrap: 'break-word',
        textAlign: 'left',
        ...mixin(theme).outline,

        '& > a': {
            color: theme.palette.primary[0],
            textDecoration: 'underline',
            fontWeight: theme.text.weight[3],
            ...theme.hover({
                textDecoration: 'none',
            }),
        },
    },
    primary: {
        color: theme.palette.trueWhite,
        background: theme.palette.primary[0],
        '& > a': {
            color: theme.palette.trueWhite,
        },
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
    tooltipWrp: {
        width: '100%',
    },
    tooltipWrpRight: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    tooltip: {
        width: 'max-content',
    },
    uploadsList: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: theme.rem(2),
    },
    uploadsListRight: {
        justifyContent: 'flex-end',
        '& img': {
            margin: theme.rem(0, 0, 0.4, 0.4),
        },
    },
    uploads: {
        display: 'block',
        height: theme.rem(15),
        width: theme.rem(20),
        margin: theme.rem(0, 0.4, 0.4, 0),
        objectFit: 'cover',
        borderRadius: theme.radius,
        cursor: 'zoom-in',
        ...mixin(theme).outline,
    },
}));

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
                {addZeroToNumber(currentDay.getDate())} {month[currentDay.getMonth()]}
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
        if (ref.current && messages.data.data.length) {
            media
                ? ref.current?.scrollTo({ top: (ref.current?.children?.[0] as HTMLDivElement)?.offsetHeight || 0 })
                : window.scrollTo({ top: ref.current?.offsetHeight || 0 });
        }
    }, [media, ref, messages.data.data]);

    const openSlider = (images: string[]) => (): void => {
        modal.open(<FullPageGallery images={images} />);
    };

    const openUserModal = (message: IMessages) => (): void => {
        modal.open(<ChatUserModal message={message} />);
    };

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

                                  {item?.uploads?.length ? (
                                      <div className={clsx(css.uploadsList, user.id === item.user_id && css.uploadsListRight)}>
                                          {item.uploads.map<ReactElement>(src => (
                                              <img
                                                  key={src}
                                                  src={src}
                                                  height="160"
                                                  width="200"
                                                  onClick={openSlider(item.uploads)}
                                                  className={css.uploads}
                                                  aria-hidden="true"
                                                  alt=""
                                              />
                                          ))}
                                      </div>
                                  ) : null}

                                  <Tooltip
                                      className={css.tooltip}
                                      classNameWrp={clsx(css.tooltipWrp, user.id === item.user_id && css.tooltipWrpRight)}
                                      content={`${item.first_name} ${item.last_name}`}
                                  >
                                      <button
                                          type="button"
                                          className={clsx(css.box, user.id === item.user_id && css.primary)}
                                          onClick={openUserModal(item)}
                                          dangerouslySetInnerHTML={{ __html: createHTML(item.text || '') }}
                                      />
                                  </Tooltip>
                              </div>

                              <DateSeparator
                                  prevDate={array[index + 1]?.creation_datetime}
                                  currentDate={item.creation_datetime}
                              />
                          </Fragment>
                      ))
                    : null}
                <ChatInitConversation>{children || <ChatEmpty />}</ChatInitConversation>
            </div>
        </div>
    );
};

export default ChatFlow;
