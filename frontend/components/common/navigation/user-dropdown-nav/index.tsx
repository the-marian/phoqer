import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import config from '../../../../assets/config';
import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';
import { IPublicProfile, IState, ITabs } from '../../../../interfaces';
import types from '../../../../redux/types';
import Spinner from '../../loaders/spinner';
import NavTabs from '../';

const useStyles = createUseStyles((theme: Theme) => ({
    item: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.black[0],
        margin: theme.rem(2.5, 0),
        fontSize: theme.rem(1.6),

        ...theme.hover({
            color: theme.palette.primary[0],
        }),

        ...theme.media(1100).max({
            fontSize: theme.rem(1.6),
        }),
    },
    text: {
        marginLeft: theme.rem(1),
    },
}));

interface IProps {
    className?: string;
}

const UserNavDropdown = ({ className }: IProps): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();
    const trans = useTrans();

    const [loading, setLoading] = useState(false);
    const user = useSelector<IState, IPublicProfile | null>(state => state.user);
    const profileTabs: ITabs[] = config.userNavLinks(String(user?.id), { messages: 5, reviews: 9 });

    const handleLogout = () => {
        setLoading(true);
        dispatch({ type: types.LOGOUT_INIT });
    };

    return (
        <CSSTransition in appear timeout={200} unmountOnExit>
            <NavTabs tabs={profileTabs} classNameWrp={className} className={css.item} classNameText={css.text}>
                <>
                    <li>
                        <button type="button" className={css.item} onClick={handleLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            <span className={css.text}>{trans('logout')}</span>
                        </button>
                    </li>
                    {loading && (
                        <li>
                            <Spinner />
                        </li>
                    )}
                </>
            </NavTabs>
        </CSSTransition>
    );
};

export default UserNavDropdown;
