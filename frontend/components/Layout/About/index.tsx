import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';
import useTrans from '../../../hooks/trans.hook';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        margin: theme.rem(10, 0, 20),

        '@media (max-width: 500px)': {
            margin: theme.rem(8, 0),
        },
    },
    img: {
        height: theme.rem(75),
        objectFit: 'cover',

        '@media (max-width: 1200px)': {
            height: theme.rem(55),
        },
        '@media (max-width: 500px)': {
            height: theme.rem(40),
        },
    },
    title: {
        textTransform: 'uppercase',
        margin: theme.rem(10, 0, 5),
        textAlign: 'center',
        fontSize: theme.rem(2),
        fontWeight: theme.text.weight[3],

        '@media (max-width: 500px)': {
            margin: theme.rem(5, 0, 3),
        },
    },
    content: {
        width: '100%',
        maxWidth: theme.rem(60),
        margin: '0 auto',

        '@media (max-width: 500px)': {
            maxWidth: '80%',
        },
    },
    text: {
        margin: theme.rem(3, 0),
        fontSize: theme.rem(1.4),
        textAlign: 'center',

        '@media (max-width: 768px)': {
            fontSize: theme.rem(1.6),
        },

        '@media (max-width: 500px)': {
            margin: theme.rem(2, 0),
        },
    },
}));

const About = (): ReactElement => {
    const css = useStyles();
    const T = useTrans();
    return (
        <div className={css.wrp}>
            <img className={css.img} src="/about.jpg" alt="about" />

            <h2 className={css.title}>phoqer</h2>
            <div className={css.content}>
                <p className={css.text}>{T.about_1}</p>
                <p className={css.text}>{T.about_2}</p>
                <p className={css.text}>{T.about_3}</p>
            </div>
        </div>
    );
};

export default About;
