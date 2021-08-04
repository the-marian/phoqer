import Link from 'next/link';
import React, { ReactElement, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { IMessages, IPublicProfile, IState } from '../../../../../interfaces';
import types from '../../../../../redux/types';
import routes from '../../../../../utils/routes';
import mixin from '../../../../../utils/theming/mixin';
import { Theme } from '../../../../../utils/theming/theme';
import RectSkeleton from '../../../../common/loaders/skeletons/rect';
import TextSkeleton from '../../../../common/loaders/skeletons/text';
import { modal } from '../../../../common/modal';
import FullPageGallery from '../../../../common/modal/full-page-gallery';
import MidModalWrp from '../../../../common/modal/mid-modal-wrp';
import UserAvatar from '../../../../common/user-avatar';
import { createHTML } from '../chat-flow/chat-flow.utils';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.rem(4),
    },
    user: {
        marginLeft: theme.rem(1),
    },
    name: {
        color: theme.palette.black[0],
        fontSize: theme.rem(1.8),
        ...theme.hover({
            textDecoration: 'underline',
        }),
    },
    email: {
        color: theme.palette.gray[2],
        fontSize: theme.rem(1.4),
    },
    title: {
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[2],
        marginBottom: theme.rem(1),
    },
    message: {
        marginBottom: theme.rem(2),
        fontSize: theme.rem(1.6),
        wordWrap: 'break-word',

        '& > a': {
            color: theme.palette.primary[0],
            textDecoration: 'underline',
            fontWeight: theme.text.weight[3],
            ...theme.hover({
                textDecoration: 'none',
            }),
        },
    },
    uploads: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    image: {
        display: 'block',
        height: theme.rem(8),
        width: theme.rem(9),
        margin: theme.rem(0, 0.4, 0.4, 0),
        objectFit: 'cover',
        borderRadius: theme.radius,
        cursor: 'zoom-in',
        ...mixin(theme).outline,
    },
    // loaders
    text: {
        flexGrow: 2,
        marginLeft: theme.rem(2),
    },
    avatar: {
        height: theme.rem(10),
        width: theme.rem(10),
        '& div': {
            borderRadius: '50%',
        },
    },
}));

interface IProps {
    message: IMessages;
}

const ChatUserModal = ({ message }: IProps): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();
    const profile = useSelector<IState, IPublicProfile | null>(state => state.profiles.public);

    useEffect(() => {
        dispatch({ type: types.GET_PUBLIC_PROFILE_START, payload: message.user_id });
    }, [dispatch, message?.user_id]);

    const openSlider = (images: string[]) => (): void => {
        modal.open(<FullPageGallery images={images} />);
    };

    return (
        <MidModalWrp>
            <>
                {profile ? (
                    <>
                        <Link href={routes.profile.public(profile?.id)}>
                            <a className={css.flex}>
                                <UserAvatar
                                    width={6}
                                    height={6}
                                    time={profile?.last_activity}
                                    firstName={profile?.first_name}
                                    lastName={profile?.last_name}
                                    avatar={profile?.profile_img}
                                />
                                <div className={css.user}>
                                    <p className={css.name}>{profile?.first_name + ' ' + profile?.last_name}</p>
                                    <p className={css.email}>{profile?.email || 'no email'}</p>
                                </div>
                            </a>
                        </Link>

                        <h3 className={css.title}>Message:</h3>

                        <p className={css.message} dangerouslySetInnerHTML={{ __html: createHTML(message.text || '') }} />

                        {message?.uploads?.length ? (
                            <div className={css.uploads}>
                                {message.uploads.map<ReactElement>(src => (
                                    <img
                                        key={src}
                                        src={src}
                                        height="160"
                                        width="200"
                                        onClick={openSlider(message.uploads)}
                                        className={css.image}
                                        aria-hidden="true"
                                        alt=""
                                    />
                                ))}
                            </div>
                        ) : null}
                    </>
                ) : (
                    <>
                        <div className={css.flex}>
                            <RectSkeleton className={css.avatar} />
                            <div className={css.text}>
                                <TextSkeleton />
                            </div>
                        </div>
                        <div className={css.text}>
                            <TextSkeleton amount={2} />
                        </div>
                    </>
                )}
            </>
        </MidModalWrp>
    );
};

export default ChatUserModal;
