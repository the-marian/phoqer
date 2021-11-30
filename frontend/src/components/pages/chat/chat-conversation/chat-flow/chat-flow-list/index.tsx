import React, { Fragment, ReactElement } from 'react';

import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

import { IMessages, IMessagesList, IPublicProfile } from '../../../../../../interfaces';
import mixin from '../../../../../../utils/theming/mixin';
import { Theme } from '../../../../../../utils/theming/theme';
import { modal } from '../../../../../common/modal';
import FullPageGallery from '../../../../../common/modal/full-page-gallery';
import Tooltip from '../../../../../common/tooltip';
import ChatUserModal from '../../chat-user-modal';
import ChatDateSeparator from '../chat-date-separator';
import { createHTML, formatTime } from '../chat-flow.utils';

import RentRequest from './special-messages/rent-request';

const useStyles = createUseStyles((theme: Theme) => ({
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
        padding: theme.rem(0.5, 1),
        borderRadius: theme.radius,
        boxShadow: theme.shadow[1],
        background: theme.palette.gray[1],
        color: theme.palette.black[0],
        wordWrap: 'break-word',
        textAlign: 'left',
        fontSize: theme.rem(1.4),
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
        color: theme.palette.black[0],
        background: theme.palette.white,
        '& > a': {
            color: theme.palette.trueWhite,
        },
    },
    time: {
        margin: theme.rem(0.2, 0, 0.2, 0.4),
        color: theme.palette.gray[2],
        fontSize: theme.rem(1.2),
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
        height: theme.rem(8),
        width: theme.rem(12),
        margin: theme.rem(0, 0.4, 0.4, 0),
        objectFit: 'cover',
        borderRadius: theme.radius,
        cursor: 'zoom-in',
        ...mixin(theme).outline,
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
}));

interface IProps {
    user: IPublicProfile;
    messages: IMessagesList;
}

const ChatFlowList = ({ messages, user }: IProps): ReactElement => {
    const css = useStyles();

    const openSlider = (images: string[]) => (): void => {
        modal.open(<FullPageGallery images={images} />);
    };

    const openUserModal = (message: IMessages) => (): void => {
        modal.open(<ChatUserModal message={message} />);
    };

    const MessageTypeMap = (item: IMessages, index: number, array: IMessages[]): { [key: string]: ReactElement } => ({
        RENT_REQUEST: <RentRequest message={item} />,
        none: (
            <div className={clsx(css.messages, user.id === item.user_id && css.right)}>
                {array[index + 1]?.user_id !== item.user_id && <p className={css.time}>{formatTime(item.creation_datetime)}</p>}

                {item?.uploads?.length ? (
                    <div className={clsx(css.uploadsList, user.id === item.user_id && css.uploadsListRight)}>
                        {item.uploads.map<ReactElement>(src => (
                            <img
                                key={src}
                                src={src}
                                height="80"
                                width="120"
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
        ),
    });

    return (
        <>
            {messages.data.data.map<ReactElement>((item, index, array) => {
                const messageTypeMap = MessageTypeMap(item, index, array);
                return (
                    <Fragment key={item.id}>
                        {messageTypeMap[item.text] || messageTypeMap.none}
                        <ChatDateSeparator prevDate={array[index + 1]?.creation_datetime} currentDate={item.creation_datetime} />
                    </Fragment>
                );
            })}
        </>
    );
};

export default ChatFlowList;
