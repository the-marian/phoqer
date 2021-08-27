import React, { ReactElement } from 'react';

import { createUseStyles } from 'react-jss';

import useConfig from '../../../../hooks/config.hook';
import { Theme } from '../../../../utils/theming/theme';
import CheckYesNo from '../../checkbox/check-yes-no';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        marginBottom: theme.rem(2),
        fontSize: theme.rem(1.4),
        color: theme.palette.black[0],
    },
}));

const OfferCardSwitcher = (): ReactElement => {
    const css = useStyles();
    const [config, setConfig] = useConfig();

    const handleChange = (value: boolean): void => {
        setConfig({ ...config, offerCardSize: value ? 'big' : 'small' });
    };

    return (
        <div className={css.root}>
            <CheckYesNo value={config.offerCardSize === 'big'} onChange={handleChange} titles={['Big cards', 'Small cards']}>
                Change view mode
            </CheckYesNo>
        </div>
    );
};

export default OfferCardSwitcher;
