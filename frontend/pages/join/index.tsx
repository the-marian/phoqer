import Head from 'next/head';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import JoinForm from '../../components/Common/Auth/JoinForm';
import Container from '../../components/Layout/Container';
import Main from '../../components/Layout/Main';
import { Theme } from '../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        '@media (max-width: 1000px)': {
            flexDirection: 'column',
        },
    },
    form: {
        width: theme.rem(40),
        marginRight: theme.rem(4),

        '@media (max-width: 1000px)': {
            margin: 0,
        },

        '@media (max-width: 420px)': {
            width: '100%',
        },
    },
    img: {
        height: '70vh',
        width: theme.rem(70),
        marginLeft: theme.rem(4),
        borderRadius: theme.radius,
        objectFit: 'cover',

        '@media (max-width: 1350px)': {
            width: '60%',
        },

        '@media (max-width: 1000px)': {
            width: '100%',
            height: '20vh',
            margin: theme.rem(0, 0, 6),
        },

        '@media (max-width: 420px)': {
            margin: theme.rem(0, 0, 3),
        },
    },
}));

const Login = (): ReactElement => {
    const css = useStyles();

    return (
        <>
            <Head>
                <title>Join | Fucking project</title>
            </Head>
            <Main>
                <Container>
                    <div className={css.root}>
                        <div className={css.form}>
                            <JoinForm />
                        </div>
                        <img className={css.img} src="/join.jpg" alt="" />
                    </div>
                </Container>
            </Main>
        </>
    );
};

export default Login;
