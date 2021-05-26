import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';
import useTrans from '../../../hooks/trans.hook';
import { ITabs } from '../../../interfaces';
import NotifNumber from '../notif-number';

const useStyles = createUseStyles((theme: Theme) => ({
    noText: {
        '& button': {
            fontSize: 0,
            background: theme.palette.secondary[0],

            '& svg': {
                height: theme.rem(1.6),
                width: theme.rem(1.6),
            },

            '& span': {
                display: 'none',
                margin: 0,
            },
        },

        '&:nth-last-of-type(1) > button': {
            marginRight: theme.rem(4),
        },
    },
    number: {
        marginLeft: theme.rem(0.5),
    },
}));

interface INavTabsItem {
    item: ITabs;
    active: boolean;
    className?: string;
    activeClass?: string;
    classNameWrp?: string;
    classNameText?: string;
}

const NavTabsItem = ({ item, className, active, classNameText, activeClass }: INavTabsItem): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const history = useRouter();

    const handleClick = (): void => {
        if (item.blank) {
            window.open(item.link, '_blank')?.focus();
            return;
        }

        if (item.onClick) {
            item.onClick();
            return;
        }

        if (item.link) history.push(item.link);
    };

    return (
        <li key={item.id} className={clsx(!item.text && item.icon && css.noText)}>
            <button type="button" onClick={handleClick} className={clsx(active && activeClass, className)}>
                {item.icon ? <FontAwesomeIcon icon={item.icon} /> : null}

                <span className={classNameText}>{trans(item.text)}</span>

                {item?.count ? <NotifNumber className={css.number}>{item?.count}</NotifNumber> : null}
            </button>
        </li>
    );
};

interface INavTabs {
    tabs: ITabs[];
    active?: number | string;
    className?: string;
    activeClass?: string;
    classNameWrp?: string;
    classNameText?: string;
    children?: JSX.Element | JSX.Element[] | string | null;
}

const NavTabs = ({
    tabs,
    active,
    className,
    activeClass,
    classNameWrp,
    classNameText,
    children = null,
}: INavTabs): ReactElement => (
    <nav className={classNameWrp}>
        <ul>
            {tabs.map(item => (
                <NavTabsItem
                    key={item.id}
                    item={item}
                    active={item.id === active}
                    className={className}
                    activeClass={activeClass}
                    classNameText={classNameText}
                />
            ))}
            {children}
        </ul>
    </nav>
);

export default NavTabs;
