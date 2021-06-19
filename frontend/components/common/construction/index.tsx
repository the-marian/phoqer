import React, { ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';
import useTrans from '../../../hooks/trans.hook';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        padding: theme.rem(6, 8),
        background: theme.palette.gray[0],
        borderRadius: theme.radius,
    },
    wrap: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    test: {
        maxWidth: theme.rem(40),
        margin: '0 auto 5rem',
        textAlign: 'center',
        fontSize: theme.rem(1.6),
        fontWeight: theme.text.weight[4],
        color: theme.palette.gray[4],
    },
    img: {
        width: 'auto',
        minWidth: theme.rem(30),
        height: theme.rem(30),
        background: theme.palette.gray[1],
        ...theme.media(768).max({
            height: 'auto',
            width: theme.rem(30),
        }),
    },
}));

interface IProps {
    text?: string;
}

const Construction = ({ text }: IProps): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const [img, setImg] = useState('');

    useEffect(() => {
        if (process.browser) {
            const random = Math.round(Math.random() * 10);
            setImg(`/construction/${random || 1}.gif`);
        }
    }, []);

    return (
        <div className={css.root}>
            <p className={css.test}>
                {trans(text || 'This page is under construction. We will try to finish it as soon as possible.')}
            </p>
            <div className={css.wrap}>
                <img className={css.img} src={img} alt="" />
            </div>
        </div>
    );
};

export default Construction;
