import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import config from '../../../../assets/config';
import { Theme } from '../../../../assets/theme';
import useAuth from '../../../../hooks/auth.hook';
import useTrans from '../../../../hooks/trans.hook';
import { ITabs } from '../../../../interfaces';
import types from '../../../../redux/types';
import Spinner from '../../Preloaders/Spinner';
import NavTabs from '../index';

const useStyles = createUseStyles((theme: Theme) => ({
    item: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.black[0],
        margin: theme.rem(2.5, 0),
        fontSize: theme.rem(1.6),

        '&:hover': {
            color: theme.palette.primary[0],
        },

        '@media (max-width: 1100px)': {
            fontSize: theme.rem(2),
        },
    },
    red: {
        marginLeft: theme.rem(0.5),
        color: theme.palette.red[0],
        fontWeight: theme.text.weight[3],
    },
    text: {
        marginLeft: theme.rem(1),
    },
}));

interface IProps {
    className?: string;
}

const UserNavLinks = ({ className }: IProps): ReactElement => {
    const css = useStyles();
    const T = useTrans();
    const auth = useAuth();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const profileTabs: ITabs[] = config.userNavLinks(String(auth?.id), T, { messages: 5, reviews: 9 });

    const handleLogout = () => {
        setLoading(true);
        dispatch({ type: types.LOGOUT_INIT });
    };

    return (
        <NavTabs tabs={profileTabs} classNameWrp={className} className={css.item} classNameText={css.text}>
            <>
                <li>
                    <button type="button" className={css.item} onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span className={css.text}>{T.logout}</span>
                    </button>
                </li>
                {loading && (
                    <li>
                        <Spinner />
                    </li>
                )}
            </>
        </NavTabs>
    );
};

export default UserNavLinks;
