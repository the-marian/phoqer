import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    img: {
        display: 'block',
        height: theme.rem(45),
        width: '100%',
        objectFit: 'contain',
    },
}));

const SmallBanner = (): ReactElement => {
    const css = useStyles();
    return (
        <img
            className={css.img}
            src="https://i1.wp.com/devarts.pro/wp-content/uploads/2020/07/joycasino-logo.jpg?ssl=1"
            alt=""
        />
    );
};

export default SmallBanner;
