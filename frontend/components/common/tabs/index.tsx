import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import useTrans from '../../../hooks/trans.hook';
import { Theme } from '../../../utils/theming/theme';
import NotifNumber from '../notif-number';
import { ITabsItem } from './tabs.config';

const useStyles = createUseStyles((theme: Theme) => ({
    list: {
        display: 'flex',
        flex: 1,
        borderBottom: theme.border(0.05, theme.palette.primary[0]),
    },
    button: {
        display: 'flex',
        padding: theme.rem(1, 1.5),
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
}));

interface TabsItemProps {
    tab: ITabsItem;
    active: string;
    onClick: (value: string) => void;
}

const TabsItem = ({ tab, active, onClick }: TabsItemProps) => {
    const css = useStyles();
    const trans = useTrans();

    const handleClick = (): void => onClick(tab.id);

    return (
        <li>
            <button className={clsx(css.button, active === tab.id && css.active)} type="button" onClick={handleClick}>
                <span className={css.text}>{trans(tab.text)}</span>
                {tab.count && <NotifNumber>{tab.count}</NotifNumber>}
            </button>
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
