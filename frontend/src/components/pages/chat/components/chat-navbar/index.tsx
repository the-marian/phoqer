import React, { useCallback, useEffect, useState } from 'react';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';

import useMedia from '../../../../../hooks/media.hook';
import routes from '../../../../../utils/routes';
import mixin from '../../../../../utils/theming/mixin';
import { Theme } from '../../../../../utils/theming/theme';
import SegmentedControl from '../../../../common/segmented-control';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        transition: theme.transitions[0],
    },
    open: {
        zIndex: 21,
        transform: 'translateY(6rem)',
    },
    tabs: {
        marginBottom: theme.rem(1),
    },
    btn: {
        ...mixin(theme).btn,
        height: theme.rem(3.5),
        width: theme.rem(3.5),
        borderRadius: '50%',
        fontSize: theme.rem(1),
        background: theme.palette.secondary[0],
        color: theme.palette.primary[0],
        transition: theme.transitions[0],
        border: theme.border(0.2, theme.palette.primary[0]),

        ...theme.hover({
            background: theme.palette.primary[0],
            color: theme.palette.trueWhite,
        }),
    },
    openBtn: {
        transform: 'rotate(180deg)',
    },
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20,
        background: theme.palette.modal,
    },
}));

const navTabs = [
    {
        id: 'my-offers',
        text: 'my_offers',
    },
    {
        id: 'notifications',
        text: 'notifications',
    },
    {
        id: 'referral',
        text: 'invite_friends',
    },
    {
        id: 'settings',
        text: 'settings',
    },
    {
        id: 'analytics',
        text: 'analytics',
    },
];

const routesMap: { [key: string]: string } = {
    'my-offers': routes.my_offers(),
    notifications: routes.notifications,
    referral: routes.referral,
    settings: routes.settings(),
    analytics: routes.analytics,
};

const ChatNavbar = (): JSX.Element => {
    const css = useStyles();
    const history = useRouter();
    const media = useMedia(768);
    const [open, setOpen] = useState(false);
    const toggleOpen = (): void => setOpen(prev => !prev);

    const handleTab = useCallback(
        (value: string): void => {
            history.push(routesMap[value]);
        },
        [history],
    );

    useEffect(() => {
        const handler = (event: KeyboardEvent): void => {
            if (event.code === 'Escape') {
                setOpen(false);
            }
        };
        window.addEventListener('keydown', handler);
        return () => {
            window.removeEventListener('keydown', handler);
        };
    }, []);

    return (
        <>
            {media && (
                <>
                    {open && <div className={css.backdrop} onClick={toggleOpen} aria-hidden="true" />}
                    <div className={clsx(css.root, open && css.open)}>
                        <SegmentedControl classNameWrp={css.tabs} tabs={navTabs} active="none" onClick={handleTab} />
                        <button onClick={toggleOpen} className={clsx(css.btn, open && css.openBtn)} type="button">
                            <FontAwesomeIcon icon={faChevronDown} />
                        </button>
                    </div>
                </>
            )}
        </>
    );
};

export default ChatNavbar;
