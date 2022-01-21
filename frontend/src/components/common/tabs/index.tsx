import React, { ReactElement, useState } from 'react';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

import useTrans from '../../../hooks/trans.hook';
import { Theme } from '../../../utils/theming/theme';
import Badge from '../badge';

import { ITabsItem } from './tabs.config';

const useStyles = createUseStyles((theme: Theme) => ({
    list: {
        display: 'flex',
        flex: 1,
        borderBottom: theme.border(0.05, theme.palette.primary[0]),

        '& > li': {
            position: 'relative',
        },
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        minHeight: theme.rem(4),
        padding: theme.rem(0.2, 1.5),
        background: theme.palette.gray[0],
        border: theme.border(0.05, theme.palette.gray[1]),
        borderBottom: 'none',
        borderRadius: '0.7rem 0.7rem 0 0',
        transition: theme.transitions[0],
        color: theme.palette.black[0],

        ...theme.hover({
            background: theme.palette.gray[1],
        }),
        ...theme.focus({
            background: theme.palette.gray[1],
        }),

        '&:not(:nth-last-of-type(1))': {
            borderRight: 'none',
        },
    },
    active: {
        position: 'relative',
        background: theme.palette.white,
        border: theme.border(0.05, theme.palette.primary[0]),
        borderBottom: 'none',
        pointerEvents: 'none',

        ...theme.hover({
            background: theme.palette.primary[0],
        }),
        ...theme.focus({
            background: theme.palette.primary[0],
        }),

        '&::before': {
            content: '""',
            position: 'absolute',
            bottom: theme.rem(-0.5),
            left: 0,
            height: theme.rem(1),
            width: '100%',
            background: theme.palette.white,
        },
    },
    text: {
        marginRight: theme.rem(1),
        fontSize: theme.rem(1.2),
    },
    sub: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        transform: 'translateY(calc(100% + 0.5rem))',
        width: theme.rem(20),
        padding: theme.rem(1, 0),
        borderRadius: theme.radius,
        boxShadow: theme.shadow[2],
        background: theme.palette.white,
        border: theme.border(0.1, theme.palette.gray[2]),
        zIndex: 10,

        '& button': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: theme.rem(2),
            fontSize: theme.rem(1.2),
            textAlign: 'left',

            ...theme.hover({
                background: theme.palette.gray[0],
            }),
        },
    },
    badge: {
        marginLeft: theme.rem(0.5),
    },
}));

interface TabsItemProps {
    tab: ITabsItem;
    active: string;
    onClick: (value: string) => void;
}

const TabsItem = ({ tab, active, onClick }: TabsItemProps) => {
    const css = useStyles();
    const trans = useTrans();
    const [open, setOpen] = useState<boolean>(false);

    const handleClick = (): void => {
        if (!tab?.sub) {
            onClick(tab.id);
        }

        setOpen(prev => !prev);
    };

    return (
        <li>
            <button className={clsx(css.button, active === tab.id && css.active)} type="button" onClick={handleClick}>
                <span className={css.text}>{trans(tab.text)}</span>
                {tab?.sub && <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />}
                {tab.count && <Badge className={css.badge}>{tab.count}</Badge>}
            </button>

            {tab?.sub && open && (
                <ul className={css.sub}>
                    {tab.sub.map(item => {
                        const handleSubClick = (): void => onClick(item.id);
                        return (
                            <li key={item.id}>
                                <button className={clsx(active === tab.id && css.active)} type="button" onClick={handleSubClick}>
                                    {trans(item.text)}
                                    {item.count && <Badge className={css.badge}>{item.count}</Badge>}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </li>
    );
};

interface IProps {
    onClick: (value: string) => void;
    tabs: ITabsItem[];
    active: string;
}

const Tabs = ({ onClick, tabs, active }: IProps): ReactElement => {
    const css = useStyles();

    return (
        <ul className={css.list}>
            {tabs.map<ReactElement>(item => (
                <TabsItem key={item.id} tab={item} active={active} onClick={onClick} />
            ))}
        </ul>
    );
};

export default Tabs;
