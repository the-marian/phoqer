import { faFlag } from '@fortawesome/free-regular-svg-icons/faFlag';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import React, { ReactElement, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { IPublicProfile, IState } from '../../../../../interfaces';
import types from '../../../../../redux/types';
import routes from '../../../../../utils/routes';
import { Theme } from '../../../../../utils/theming/theme';
import Navigation from '../../../../common/navigation';
import { getBaseNavList } from '../../../../common/navigation/navigation.config';

const useStyles = createUseStyles((theme: Theme) => ({
    backdrop: {
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
    wrp: {
        position: 'fixed',
        top: theme.rem(7),
        right: 'calc((100% - 120rem) / 2)',
        zIndex: 10001,
        minWidth: theme.rem(30),
        padding: theme.rem(2),
        background: theme.palette.white,
        borderRadius: theme.radius,
        border: theme.border(0.1, theme.palette.gray[1]),
        transition: theme.transitions[0],

        ...theme.media(1300).max({
            right: '5%',
        }),

        ...theme.media(500).max({
            top: theme.rem(6),
        }),
    },
}));

interface Props {
    onClose: () => void;
}

const DropWindow = ({ onClose }: Props): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();
    const user = useSelector<IState, IPublicProfile | null>(state => state.user);

    useEffect(() => {
        const handleClose = (event: KeyboardEvent): void => {
            if (event.code !== 'Escape') return;
            onClose();
        };
        window.addEventListener('keydown', handleClose);

        return () => window.removeEventListener('keydown', handleClose);
    }, [onClose]);

    const handleLogout = () => {
        dispatch({ type: types.LOGOUT_INIT });
    };

    return ReactDOM.createPortal(
        <>
            <div className={css.backdrop} onClick={onClose} aria-hidden="true" />
            <div className={css.wrp}>
                <Navigation
                    tabs={[
                        {
                            id: 'personal-area',
                            text: 'personal_area',
                            link: routes.profile.private.personal_area,
                            icon: faFlag,
                        },
                        ...getBaseNavList({ userId: user?.id }),
                        {
                            id: 'logout',
                            text: 'logout',
                            onClick: handleLogout,
                            icon: faSignOutAlt,
                        },
                    ]}
                />
            </div>
        </>,
        document.body,
    );
};

export default DropWindow;
