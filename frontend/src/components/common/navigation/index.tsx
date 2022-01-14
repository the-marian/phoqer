import React, { ReactElement, useState } from 'react';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import { CSSTransition } from 'react-transition-group';

import useTrans from '../../../hooks/trans.hook';
import { ITabs } from '../../../interfaces';
import { Theme } from '../../../utils/theming/theme';
import Badge from '../badge';

const useStyles = createUseStyles((theme: Theme) => ({
    item: {
        margin: theme.rem(0.2, 0),

        ...theme.media(768).max({
            margin: theme.rem(1, 0),
        }),
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: theme.rem(1.4, 1),
        borderRadius: theme.radius,
        fontSize: theme.rem(1.4),
        transition: theme.transitions[0],
        color: theme.palette.black[0],

        ...theme.media(768).max({
            padding: theme.rem(1.4, 2),
        }),

        ...theme.hover({
            background: theme.palette.gray[0],
            color: theme.palette.primary[0],
        }),

        '& svg.fa-chevron-down, & svg.fa-chevron-up': {
            marginTop: theme.rem(0.2),
            marginLeft: 'auto',
        },
    },

    sub: {
        position: 'relative',
        paddingLeft: theme.rem(2.6),
        background: theme.palette.gray[0],

        ...theme.hover({
            background: theme.palette.secondary[0],
            color: theme.palette.primary[0],
        }),

        ...theme.media(768).max({
            paddingLeft: theme.rem(3.6),
        }),
    },
    subList: {
        overflow: 'hidden',
        maxHeight: theme.rem(20),
        transition: theme.transitions[0],

        '&.enter': {
            maxHeight: 0,
            transition: 'unset',
        },
        '&.enter-done': {
            maxHeight: theme.rem(20),
            transition: theme.transitions[0],
        },

        '&.exit': {
            maxHeight: 0,
            transition: theme.transitions[0],
        },
    },
    text: {
        margin: theme.rem(0, 1),
    },
}));

interface NavigationItemProp {
    tab: ITabs;
}

export const NavigationItem = ({ tab }: NavigationItemProp): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const history = useRouter();

    const [open, setOpen] = useState<boolean>(true);
    const handleOpen = (): void => {
        setOpen(prev => !prev);
    };

    const handleClick = (): void => {
        if (tab.onClick) {
            tab.onClick();
            return;
        }

        if (tab.link) history.push(tab.link);
    };

    return (
        <li className={css.item}>
            {tab.sub?.length ? (
                <>
                    <button type="button" className={css.button} onClick={handleOpen}>
                        {tab.icon ? <FontAwesomeIcon icon={tab.icon} /> : null}
                        <span className={css.text}>{trans(tab.text)}</span>
                        {tab?.count ? <Badge>{tab.count}</Badge> : null}
                        <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
                    </button>

                    <CSSTransition timeout={200} mountOnEnter unmountOnExit in={open}>
                        <ul className={css.subList}>
                            {tab.sub.map(sub => {
                                const handleSubClick = (): void => {
                                    if (sub.onClick) {
                                        sub.onClick();
                                        return;
                                    }

                                    if (sub.link) history.push(sub.link);
                                };

                                return (
                                    <li className={css.item} key={sub.id}>
                                        <button className={clsx(css.button, css.sub)} type="button" onClick={handleSubClick}>
                                            <span className={css.text}>{trans(sub.text)}</span>
                                            {sub?.count ? <Badge>{sub.count}</Badge> : null}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </CSSTransition>
                </>
            ) : (
                <button className={css.button} type="button" onClick={handleClick}>
                    {tab.icon ? <FontAwesomeIcon icon={tab.icon} /> : null}
                    <span className={css.text}>{trans(tab.text)}</span>
                    {tab?.count ? <Badge>{tab.count}</Badge> : null}
                </button>
            )}
        </li>
    );
};

interface IProps {
    className?: string;
    tabs: ITabs[];
}

const Navigation = ({ className, tabs }: IProps): ReactElement => {
    return (
        <ul className={className}>
            {tabs.map<ReactElement>(item => (
                <NavigationItem key={item.id} tab={item} />
            ))}
        </ul>
    );
};

export default Navigation;
