import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';
import SmallModalWrp from '../../modal/small-modal-wrp';

const useStyles = createUseStyles((theme: Theme) => ({
    title: {
        fontSize: theme.rem(2),
        fontWeight: theme.text.weight[4],
        color: theme.palette.red[0],
        textAlign: 'center',
    },

    img: {
        display: 'block',
        width: theme.rem(7),
        margin: '0 auto 2rem',
        textAlign: 'center',
    },

    p: {
        marginTop: theme.rem(1),
        fontSize: theme.rem(1.4),
        textAlign: 'center',
    },
}));

interface IProps {
    text: string;
}

const NotificationError = ({ text }: IProps): ReactElement => {
    const css = useStyles();
    return (
        <SmallModalWrp>
            <img className={css.img} src="/emoji/error.png" alt="" />
            <h4 className={css.title}>Oops</h4>
            <p className={css.p}>{text}</p>
        </SmallModalWrp>
    );
};

export default NotificationError;
