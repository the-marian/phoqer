import { faCommentAlt } from '@fortawesome/free-regular-svg-icons/faCommentAlt';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { faUser } from '@fortawesome/free-regular-svg-icons/faUser';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons/faBullhorn';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons/faSlidersH';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';
import React, { ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import routes from '../../../assets/routes';
import { Theme } from '../../../assets/theme';
import useAuth from '../../../hooks/auth.hook';
import useTrans from '../../../hooks/trans.hook';
import types from '../../../redux/types';
import NotifNumber from '../NotifNumber';
import Spinner from '../Preloaders/Spinner';

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

        '& svg': {
            height: theme.rem(1.6),
            width: theme.rem(1.6),
        },

        '@media (max-width: 1100px)': {
            fontSize: theme.rem(2),

            '& svg': {
                height: theme.rem(2),
                width: theme.rem(2),
            },
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

const UserLinks = ({ className }: IProps): ReactElement => {
    const css = useStyles();
    const T = useTrans();
    const auth = useAuth();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        setLoading(true);
        dispatch({ type: types.LOGOUT_START });
    };
    return (
        <ul className={className}>
            <li>
                <Link href={routes.profile.public()} as={routes.profile.public(auth?.first_name)}>
                    <a className={css.item}>
                        <FontAwesomeIcon icon={faUser} />
                        <span className={css.text}>{T.my_profile}</span>
                    </a>
                </Link>
            </li>
            <li>
                <Link href={routes.root}>
                    <a className={css.item}>
                        <FontAwesomeIcon icon={faBullhorn} />
                        <span className={css.text}>{T.my_offers}</span>
                    </a>
                </Link>
            </li>
            <li>
                <Link href={routes.root}>
                    <a className={css.item}>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <span className={css.text}>{T.messages}</span>
                        <NotifNumber style={{ position: 'static', top: 'unset', left: 'unset', marginLeft: '1rem' }}>
                            14
                        </NotifNumber>
                    </a>
                </Link>
            </li>
            <li>
                <Link href={routes.root}>
                    <a className={css.item}>
                        <FontAwesomeIcon icon={faCommentAlt} />
                        <span className={css.text}>{T.reviews}</span>
                        <NotifNumber style={{ position: 'static', top: 'unset', left: 'unset', marginLeft: '1rem' }}>
                            2
                        </NotifNumber>
                    </a>
                </Link>
            </li>
            <li>
                <Link href={routes.root}>
                    <a className={css.item}>
                        <FontAwesomeIcon icon={faSlidersH} />
                        <span className={css.text}>{T.settings}</span>
                    </a>
                </Link>
            </li>
            <li>
                <Link href={routes.root}>
                    <a className={css.item}>
                        <FontAwesomeIcon icon={faUserPlus} />
                        <span className={css.text}>{T.invite_friends}</span>
                    </a>
                </Link>
            </li>
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
        </ul>
    );
};

export default UserLinks;
