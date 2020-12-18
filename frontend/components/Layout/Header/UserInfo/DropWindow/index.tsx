import { faCommentAlt, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faBullhorn, faSignOutAlt, faSlidersH, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { CSSProperties, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import router from '../../../../../assets/router';
import { Theme } from '../../../../../assets/theme';
import types from '../../../../../redux/types';
import NotifNumber from '../../../../Common/NotifNumber';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(8px)',
        background: theme.palette.modal,
        zIndex: 100,
    },
    root: {
        position: 'absolute',
        top: theme.rem(7),
        right: 0,
        zIndex: 101,
        padding: theme.rem(2, 4),
        background: theme.palette.white,
        borderRadius: theme.radius,

        '@media (max-width: 1100px)': {
            top: theme.rem(6),
        },
    },
    item: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.black[0],
        margin: theme.rem(1.4, 0),

        '&:hover': {
            color: theme.palette.primary[0],
        },
    },
    text: {
        marginLeft: theme.rem(1),
    },
}));

interface Props {
    onClose: () => void;
}

const style: CSSProperties = {
    top: '-0.8em',
    left: '-1.2em',
    right: 'unset',
};

const DropWindow = ({ onClose }: Props): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch({ type: types.LOGOUT_START });
    };
    return (
        <>
            <div className={css.wrp} onClick={onClose} aria-hidden />
            <ul className={css.root}>
                <li>
                    <Link href={router.root}>
                        <a className={css.item}>
                            <FontAwesomeIcon icon={faBullhorn} />
                            <span className={css.text}>Мои объявления</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={router.root}>
                        <a className={css.item}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span className={css.text}>Мои сообщения</span>

                            <NotifNumber style={style}>4</NotifNumber>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={router.root}>
                        <a className={css.item}>
                            <FontAwesomeIcon icon={faCommentAlt} />
                            <span className={css.text}>Отзывы</span>

                            <NotifNumber style={style}>4</NotifNumber>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={router.root}>
                        <a className={css.item}>
                            <FontAwesomeIcon icon={faSlidersH} />
                            <span className={css.text}>Настройки</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={router.root}>
                        <a className={css.item}>
                            <FontAwesomeIcon icon={faUserPlus} />
                            <span className={css.text}>Пригласить друзей</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <button type="button" className={css.item} onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span className={css.text}>Выйти</span>
                    </button>
                </li>
            </ul>
        </>
    );
};

export default DropWindow;
