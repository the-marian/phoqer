import React, { ChangeEvent, ReactElement, useRef, useState } from 'react';

import { faTrashAlt } from '@fortawesome/free-regular-svg-icons/faTrashAlt';
import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import useTrans from '../../../../../hooks/trans.hook';
import { IPublicProfile, IState } from '../../../../../interfaces';
import types from '../../../../../redux/types';
import mixin from '../../../../../utils/theming/mixin';
import { Theme } from '../../../../../utils/theming/theme';
import Button from '../../../../common/button';
import UserAvatar from '../../../../common/user-avatar';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: theme.rem(21),
    },
    sticky: {
        position: 'sticky',
        top: theme.rem(8),
        left: 0,
    },
    avatar: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.rem(2),
        cursor: 'pointer',
    },
    file: {
        ...mixin(theme).btn,
        margin: '0 auto',
        boxShadow: theme.palette.shadowBorder,

        '& svg': {
            marginBottom: theme.rem(0.2),
        },
    },
    delete: {
        ...mixin(theme).btn,
        margin: '2rem auto 4rem',
        background: theme.palette.gray[0],
        color: theme.palette.red[0],

        '& svg': {
            marginBottom: theme.rem(0.25),
        },
    },
    text: {
        marginLeft: theme.rem(1),
    },
    input: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
        display: 'block',
        width: theme.rem(0.1),
        height: theme.rem(0.1),
        opacity: 0,
        visibility: 'hidden',
        cursor: 'pointer',
    },
}));

const Avatar = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const dispatch = useDispatch();

    const ref = useRef<HTMLInputElement>(null);
    const [avatar, setAvatar] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const user = useSelector<IState, IPublicProfile | null>(state => state.user);

    const handleClick = (): void => {
        ref.current?.click();
    };

    const handleDelete = (): void => {
        setLoading(true);
        setAvatar('');
        dispatch({
            type: types.UPDATE_USER_START,
            payload: { ...user, profile_img: null },
            callback: () => setLoading(false),
        });
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLoading(true);
        if (event.target.files?.[0]) {
            setAvatar(window.URL.createObjectURL(event.target.files[0]));
            dispatch({
                type: types.UPDATE_USER_AVATAR_START,
                payload: event.target.files[0],
                callback: () => setLoading(false),
            });
        }
    };

    return (
        <div className={css.wrp}>
            <div className={css.sticky}>
                <div className={css.avatar} onClick={handleClick} aria-hidden="true">
                    <UserAvatar
                        firstName={user?.first_name}
                        lastName={user?.last_name}
                        avatar={avatar || user?.profile_img}
                        height={15}
                        width={15}
                    />
                </div>
                <input ref={ref} onChange={handleChange} className={css.input} type="file" accept=".png, .jpg, .jpeg" />
                <Button onClick={handleClick} loading={loading} className={css.file}>
                    <FontAwesomeIcon icon={faRedo} />
                    <span className={css.text}>{trans('change_photo')}</span>
                </Button>

                {user?.profile_img ? (
                    <Button onClick={handleDelete} loading={loading} className={css.delete}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                        <span className={css.text}>{trans('Удалить фото')}</span>
                    </Button>
                ) : null}
            </div>
        </div>
    );
};

export default Avatar;
