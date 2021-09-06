import React, { ReactElement } from 'react';

import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

import useTrans from '../../../hooks/trans.hook';
import mixin from '../../../utils/theming/mixin';
import { Theme } from '../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    container: {
        maxWidth: '100%',
        overflow: 'auto',
        marginBottom: theme.rem(4),
    },
    list: {
        display: 'flex',
        width: 'max-content',
        borderRadius: theme.radius,
        border: theme.border(0.1, theme.palette.primary[0]),
        overflow: 'hidden',
    },
    item: {
        flex: 1,
        minWidth: theme.rem(12),
        '&:not(:nth-last-of-type(1))': {
            borderRight: theme.border(0.1, theme.palette.primary[0]),
        },
    },
    button: {
        width: '100%',
        padding: theme.rem(1, 0.5),
        color: theme.palette.black[0],
        fontSize: theme.rem(1.2),
        ...mixin(theme).cutString,

        ...theme.hover({
            background: theme.palette.gray[0],
        }),
        ...theme.focus({
            background: theme.palette.gray[0],
        }),
    },
    active: {
        background: theme.palette.primary[0],
        color: theme.palette.trueWhite,
        pointerEvents: 'none',

        ...theme.hover({
            background: theme.palette.primary[0],
        }),
        ...theme.focus({
            background: theme.palette.primary[0],
        }),
    },
}));

interface ISegmentedControlItemProps {
    active: string;
    tab: ISegmentedControlItem;
    onClick: (value: string) => void;
}

export const SegmentedControlItem = ({ active, tab, onClick }: ISegmentedControlItemProps): ReactElement => {
    const css = useStyles();
    const trans = useTrans();

    const handleClick = (): void => onClick(tab.id);

    return (
        <li className={css.item}>
            <button className={clsx(css.button, active === tab.id && css.active)} type="button" onClick={handleClick}>
                {trans(tab.text)}
            </button>
        </li>
    );
};

export interface ISegmentedControlItem {
    id: string;
    text: string;
}

interface IProps {
    className?: string;
    classNameWrp?: string;
    active: string;
    tabs: ISegmentedControlItem[];
    onClick: (value: string) => void;
}

const SegmentedControl = ({ className, classNameWrp, active, tabs, onClick }: IProps): ReactElement => {
    const css = useStyles();

    return (
        <div className={clsx(css.container, classNameWrp)}>
            <ul className={clsx(css.list, className)}>
                {tabs.map<ReactElement>(item => (
                    <SegmentedControlItem key={item.id} tab={item} active={active} onClick={onClick} />
                ))}
            </ul>
        </div>
    );
};

export default SegmentedControl;
