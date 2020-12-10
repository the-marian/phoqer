import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: theme.rem(80),
        margin: '0 auto 5rem',
    },
    wrp: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',

        '&:not(:nth-last-of-type(1))::after': {
            content: '""',
            position: 'absolute',
            top: '28%',
            left: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1,
            width: '100%',
            height: theme.rem(0.1),
            borderTop: '0.1rem dashed ' + theme.palette.gray[2],
        },
    },
    activeWrp: {
        '&:not(:nth-last-of-type(1))::after': {
            borderTop: '0.1rem solid #F9CB28',
        },
    },
    numWrp: {
        position: 'relative',
        zIndex: 2,
        display: 'block',
        padding: theme.rem(0, 2),
        borderRadius: '50%',
        background: theme.palette.white,
    },
    num: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: theme.rem(4),
        width: theme.rem(4),
        borderRadius: '50%',
        border: theme.border(0.1, theme.palette.gray[2]),
        fontWeight: theme.text.weight[5],
        color: theme.palette.blue[0],
    },
    active: {
        border: 'none',
        background: theme.palette.grad[2],
        color: theme.palette.white,
    },
    text: {
        marginTop: theme.rem(1.5),
        fontSize: theme.rem(1.3),
        fontWeight: theme.text.weight[3],
    },
}));

interface Props {
    title: string[];
    current: number;
}

const Stepper = ({ title, current }: Props): ReactElement => {
    const css = useStyles();

    return (
        <div className={css.root}>
            {title.map((item, index) => (
                <div key={item} className={clsx(css.wrp, current - 1 > index && css.activeWrp)}>
                    <span className={css.numWrp}>
                        <span className={clsx(css.num, current > index && css.active)}>{index + 1}</span>
                    </span>
                    <p className={css.text}>{item}</p>
                </div>
            ))}
        </div>
    );
};

export default Stepper;
