import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { Theme } from '../../../assets/theme';
import useTrans from '../../../hooks/trans.hook';
import types from '../../../redux/types';
import MenuIcon from './menu-icon';

const useStyles = createUseStyles((theme: Theme) => ({
    menu: {
        display: 'flex',
        alignItems: 'center',
        marginRight: theme.rem(2),
        paddingRight: theme.rem(1),
        fontSize: theme.rem(1.8),
        color: theme.palette.black[0],

        '& svg': {
            marginRight: theme.rem(1),
        },

        ...theme.hover({
            '& div span': {
                left: '140%',
            },
        }),

        ...theme.media(768).max({
            marginRight: '0',
        }),
    },
}));

interface IProps {
    className?: string;
}

const SiteMenu = ({ className }: IProps): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const dispatch = useDispatch();

    const handleClick = (): void => {
        dispatch({ type: types.TOGGLE_DRAWER });
    };

    return (
        <button className={clsx(css.menu, className)} onClick={handleClick}>
            <MenuIcon />
            <span>{trans('menu')}</span>
        </button>
    );
};

export default SiteMenu;
