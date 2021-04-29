import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import template from '../../../../../../assets/template';
import { Theme } from '../../../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        position: 'relative',
        marginBottom: theme.rem(1),
    },
    input: {
        ...template(theme).input,
        paddingRight: theme.rem(6),
        background: theme.palette.gray[0],
    },
    search: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: theme.rem(5),
        width: theme.rem(5),
        color: theme.palette.gray[4],
        borderRadius: theme.radius,
        ...template(theme).outline,
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
