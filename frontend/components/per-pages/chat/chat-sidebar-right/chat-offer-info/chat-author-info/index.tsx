import React, { ReactElement, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { IPublicProfile, IState } from '../../../../../../interfaces';
import types from '../../../../../../redux/types';
import { Theme } from '../../../../../../utils/theming/theme';
import RectSkeleton from '../../../../../common/loaders/skeletons/rect';
import ProfileCard from '../../../../../common/profile-card';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        marginBottom: theme.rem(2),
    },
    img: {
        height: theme.rem(30),
        width: '100%',
    },
}));

interface IProps {
    id: string | number;
}

const ChatAuthorInfo = ({ id }: IProps): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();
    const loading = useSelector<IState, boolean>(state => state.profiles.loading);
    const profile = useSelector<IState, IPublicProfile | null>(state => state.profiles.public);

    useEffect(() => {
        dispatch({ type: types.GET_PUBLIC_PROFILE_START, payload: id });
    }, [dispatch, id]);

    return (
        <div className={css.root}>
            {loading ? (
                <RectSkeleton className={css.img} />
            ) : (
                <ProfileCard
                    column
                    id={profile?.id}
                    firstName={profile?.first_name}
                    lastName={profile?.last_name}
                    lastActivity={profile?.last_activity}
                    avatar={profile?.profile_img}
                    userLocation={profile?.city}
                    registerDate={profile?.date_joined}
                />
            )}
        </div>
    );
};

export default ChatAuthorInfo;
