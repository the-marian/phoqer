import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import useTrans from '../../../hooks/trans.hook';
import { ITabs } from '../../../interfaces';
import { Theme } from '../../../utils/theming/theme';
import NotifNumber from '../notif-number';

const useStyles = createUseStyles((theme: Theme) => ({
    item: {
        margin: theme.rem(0.2, 0),
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

        ...theme.hover({
            background: theme.palette.gray[0],
            color: theme.palette.primary[0],
        }),
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

    const handleClick = (): void => {
        if (tab.onClick) {
            tab.onClick();
            return;
        }

        if (tab.link) history.push(tab.link);
    };

    return (
        <li className={css.item}>
            <button className={css.button} type="button" onClick={handleClick}>
                {tab.icon ? <FontAwesomeIcon icon={tab.icon} /> : null}
                <span className={css.text}>{trans(tab.text)}</span>
                {tab?.count ? <NotifNumber>{tab.count}</NotifNumber> : null}
            </button>
        </li>
    );
};

interface IProps {
    className?: string;
    children?: ReactElement;
    tabs: ITabs[];
}

const Navigation = ({ className, children, tabs }: IProps): ReactElement => {
    return (
        <ul className={className}>
            {tabs.map<ReactElement>(item => (
                <NavigationItem key={item.id} tab={item} />
            ))}

            {children}
        </ul>
    );
};

export default Navigation;
