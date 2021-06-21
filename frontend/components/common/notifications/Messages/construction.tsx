import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { store } from 'react-notifications-component';

import useConfig from '../../../../hooks/config.hook';
import template from '../../../../utils/theming/template';
import { Theme } from '../../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    text: {
        color: theme.palette.trueBlack,
    },
    btn: {
        ...template(theme).btn,
        height: theme.rem(3.5),
        marginTop: theme.rem(1),
        padding: theme.rem(0.2, 3),
    },
}));

const ConstructionMessage = (): ReactElement => {
    const css = useStyles();
    const [config, setConfig] = useConfig();

    const handleClick = (): void => {
        setConfig({ ...config, warning: false });
        store.removeNotification('construction-message');
    };

    return (
        <>
            <p className={css.text}>
                The website is under construction. We are creating something special for you. Coming soon...
            </p>
            <button onClick={handleClick} className={css.btn} type="button">
                Ok
            </button>
        </>
    );
};

export default ConstructionMessage;
