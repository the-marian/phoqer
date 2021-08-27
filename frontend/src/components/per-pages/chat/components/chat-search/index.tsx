import React, { ReactElement } from 'react';

import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createUseStyles } from 'react-jss';

import mixin from '../../../../../utils/theming/mixin';
import { Theme } from '../../../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        position: 'relative',
        marginBottom: theme.rem(1),
    },
    input: {
        ...mixin(theme).input,
        paddingRight: theme.rem(8),
        background: theme.palette.white,
        boxShadow: theme.palette.shadowBorder,
    },
    search: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: theme.rem(4),
        width: theme.rem(5),
        color: theme.palette.gray[4],
        borderRadius: theme.radius,
        transition: theme.transitions[0],
        border: theme.border(0.2, 'transparent'),

        '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: theme.rem(-0.3),
            transform: 'translateY(-50%)',
            height: '65%',
            width: 0,
            borderLeft: theme.border(0.1, theme.palette.gray[1]),
        },

        ...theme.hover({
            color: theme.palette.primary[0],
        }),
    },
}));

const ChatSearch = (): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.root}>
            <input type="text" placeholder="Search" className={css.input} />
            <button type="button" className={css.search}>
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    );
};

export default ChatSearch;
