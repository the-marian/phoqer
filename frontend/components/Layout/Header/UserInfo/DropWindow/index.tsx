import { faCommentAlt, faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBullhorn, faSignOutAlt, faSlidersH, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { ReactElement, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import routes from '../../../../../assets/routes';
import { Theme } from '../../../../../assets/theme';
import useAuth from '../../../../../hooks/auth.hook';
import useTrans from '../../../../../hooks/trans.hook';
import types from '../../../../../redux/types';
import Spinner from '../../../../Common/Preloaders/Spinner';

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
        background: theme.palette.modal,
        zIndex: 10000,
    },
    root: {
        position: 'fixed',
        top: theme.rem(10),
        left: '50%',
        transform: 'translateX(30rem)',
        zIndex: 10001,
        minWidth: theme.rem(35),
        padding: theme.rem(2, 4),
        background: theme.palette.white,
        borderRadius: theme.radius,

        '@media (max-width: 1300px)': {
            top: theme.rem(10),
            right: '5%',
            left: 'unset',
            transform: 'unset',
        },

        '@media (max-width: 1100px)': {
            top: theme.rem(10),
            right: '5%',
        },
    },
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

interface Props {
    onClose: () => void;
}

const DropWindow = ({ onClose }: Props): ReactElement => {
    const css = useStyles();
    const T = useTrans();
    const auth = useAuth();
    const dispatch = useDispatch();
    const body = document.querySelector('body');

    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        setLoading(true);
        dispatch({ type: types.LOGOUT_START });
    };

    useEffect(() => {
        const handleClose = (event: KeyboardEvent): void => {
            if (event.code !== 'Escape') return;
            onClose();
        };
        window.addEventListener('keydown', handleClose);

        return () => {
            window.removeEventListener('keydown', handleClose);
        };
    }, []);

    return (
        <>
            {body
                ? ReactDOM.createPortal(
                      <>
                          <div className={css.wrp} onClick={onClose} aria-hidden="true" />
                          <ul className={css.root}>
                              <li>
                                  <Link href={routes.profile.single()} as={routes.profile.single(auth?.first_name)}>
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
                                          <span className={css.red}>(2)</span>
                                      </a>
                                  </Link>
                              </li>
                              <li>
                                  <Link href={routes.root}>
                                      <a className={css.item}>
                                          <FontAwesomeIcon icon={faCommentAlt} />
                                          <span className={css.text}>{T.reviews}</span>
                                          <span className={css.red}>(12)</span>
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
                      </>,
                      body,
                  )
                : null}
        </>
    );
};

export default DropWindow;
