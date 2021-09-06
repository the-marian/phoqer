import React, { ChangeEvent, ReactElement, useState } from 'react';

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
        pointerEvents: 'none',
    },
    file: {
        ...mixin(theme).btn,
        position: 'relative',
        margin: '0 auto 4rem',
        background: theme.palette.primary[0],
        boxShadow: theme.palette.shadowBorder,
        color: theme.palette.trueWhite,
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
        width: '100%',
        height: '100%',
        opacity: 0,
        cursor: 'pointer',
    },
}));

const Avatar = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const dispatch = useDispatch();

    const [avatar, setAvatar] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const user = useSelector<IState, IPublicProfile | null>(state => state.user);

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
                <div className={css.avatar}>
                    <UserAvatar
                        firstName={user?.first_name}
                        lastName={user?.last_name}
                        avatar={avatar || user?.profile_img}
                        height={15}
                        width={15}
                    />
                </div>
                <Button loading={loading} className={css.file}>
                    <FontAwesomeIcon icon={faRedo} />
                    <span className={css.text}>{trans('change_photo')}</span>
                    <input onChange={handleChange} className={css.input} type="file" accept=".png, .jpg, .jpeg" />
                </Button>
            </div>
        </div>
    );
};

export default Avatar;
