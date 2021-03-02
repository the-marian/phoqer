import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';
import useTheme from '../../../hooks/theme.hook';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        position: 'fixed',
        top: theme.rem(10),
        left: 0,
        padding: theme.rem(1.4),
        background: theme.palette.gray[1],
        fontSize: theme.rem(1.4),

        '& svg': {
            height: theme.em(1),
            width: theme.em(1),
        },
    },
}));

const Settings = (): ReactElement => {
    const css = useStyles();
    const [siteTheme, setSiteTheme] = useTheme();

    const handleTheme = (): void => {
        setSiteTheme && setSiteTheme(siteTheme === 'white' ? 'black' : 'white');
    };

    return (
        <div className={css.root} onClick={handleTheme} aria-hidden>
            <FontAwesomeIcon icon={faChevronRight} />
        </div>
    );
};

export default Settings;
