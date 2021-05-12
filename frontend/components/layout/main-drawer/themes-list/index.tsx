import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';
import useTheme from '../../../../hooks/theme.hook';
import useTrans from '../../../../hooks/trans.hook';
import { Themes } from '../../../../interfaces';

const useStyles = createUseStyles((theme: Theme) => ({
    box: {
        margin: theme.rem(1, 0),
        fontSize: theme.rem(1.4),
        textTransform: 'capitalize',
    },
    title: {
        margin: theme.rem(2, 0, 0),
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[3],
    },
    subtitle: {
        margin: theme.rem(1, 0, 0.5),
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[2],
    },
    grid: {
        display: 'flex',
    },
    item: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: theme.rem(5),
        height: theme.rem(5),
        marginRight: theme.rem(1),
        padding: theme.rem(0.4, 0.3),
        background: theme.palette.trueWhite,
        borderRadius: theme.radius,
        cursor: 'pointer',
        ...template(theme).outline,
        border: theme.border(0.2, theme.palette.gray[1]),

        '& > span': {
            display: 'block',
            width: '46%',
            height: theme.rem(1),
            borderRadius: theme.rem(0.2),
            background: '#e0e0e8',
        },

        '& > span:nth-last-of-type(1)': {
            width: '100%',
            height: theme.rem(2),
        },
    },
    blue: {
        '& > span:nth-of-type(1)': {
            background: '#007AFF',
        },
    },
    green: {
        '& > span:nth-of-type(1)': {
            background: '#32603F',
        },
    },
    aqua: {
        '& > span:nth-of-type(1)': {
            background: '#03a8ae',
        },
    },
    violet: {
        '& > span:nth-of-type(1)': {
            background: '#6704be',
        },
    },
    'black-blue': {
        background: theme.palette.trueBlack,
        '& > span:nth-of-type(1)': {
            background: '#007AFF',
        },
        '& > span:nth-last-of-type(1)': {
            background: '#454545',
        },
    },
    'black-aqua': {
        background: theme.palette.trueBlack,
        '& > span:nth-of-type(1)': {
            background: '#03a8ae',
        },
        '& > span:nth-last-of-type(1)': {
            background: '#454545',
        },
    },
    'black-violet': {
        background: theme.palette.trueBlack,
        '& > span:nth-of-type(1)': {
            background: '#BD00FF',
        },
        '& > span:nth-last-of-type(1)': {
            background: '#454545',
        },
    },
    'black-orange': {
        background: theme.palette.trueBlack,
        '& > span:nth-of-type(1)': {
            background: '#e06800',
        },
        '& > span:nth-last-of-type(1)': {
            background: '#454545',
        },
    },
    active: {
        border: theme.border(0.2, theme.palette.primary[0]),
    },
}));

interface IProps {
    element: Themes;
}

const ThemesItem = ({ element }: IProps): ReactElement => {
    const css = useStyles();
    const [theme, setTheme] = useTheme();

    const handleClick = (): void => {
        setTheme(element);
    };

    return (
        <li
            className={clsx(css.item, css[element], theme === element && css.active)}
            key={element}
            onClick={handleClick}
            aria-hidden="true"
        >
            <span />
            <span />
        </li>
    );
};

const white: Themes[] = ['blue', 'green', 'aqua', 'violet'];
const black: Themes[] = ['black-blue', 'black-violet', 'black-aqua', 'black-orange'];

const ThemesList = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();

    return (
        <>
            <h3 className={css.title}>{trans('toggle_color_theme')}</h3>
            <div className={css.box}>
                <h4 className={css.subtitle}>{trans('white_theme')}</h4>
                <ul className={css.grid}>
                    {white.map(element => (
                        <ThemesItem element={element} key={element} />
                    ))}
                </ul>
            </div>
            <div className={css.box}>
                <h4 className={css.subtitle}>{trans('dark_theme')}</h4>
                <ul className={css.grid}>
                    {black.map(element => (
                        <ThemesItem element={element} key={element} />
                    ))}
                </ul>
            </div>
        </>
    );
};

export default ThemesList;
