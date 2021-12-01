import React, { ReactElement, useEffect } from 'react';

import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { IPublicProfile, IState } from '../../../../../../interfaces';
import types from '../../../../../../redux/types';
import { Theme } from '../../../../../../utils/theming/theme';
import RectSkeleton from '../../../../../common/loaders/skeletons/rect';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        marginBottom: theme.rem(1),
    },
    img: {
        height: theme.rem(30),
        width: '100%',
    },
}));

interface IProps {
    id?: string | number;
    children: (profile: IPublicProfile | null) => ReactElement;
}

const ChatUserInfoHOC = ({ id, children }: IProps): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();
    const loading = useSelector<IState, boolean>(state => state.profiles.loading);
    const profile = useSelector<IState, IPublicProfile | null>(state => state.profiles.public);

    useEffect(() => {
        if (id) {
            dispatch({ type: types.GET_PUBLIC_PROFILE_START, payload: id });
        }
    }, [dispatch, id]);

    return <div className={css.root}>{loading ? <RectSkeleton className={css.img} /> : children(profile)}</div>;
};

export default ChatUserInfoHOC;
