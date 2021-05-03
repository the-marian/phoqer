import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { serverRedirect } from '../../../assets/helpers';
import routes from '../../../assets/routes';
import template from '../../../assets/template';
import { Theme } from '../../../assets/theme';
import LoginForm from '../../../components/common/auth/login-form';
import { modal } from '../../../components/common/modal';
import SmallModalWrp from '../../../components/common/modal/small-modal-wrp';
import AuthRedirect from '../../../components/context/auth/auth-redirect';
import useAuth from '../../../hooks/auth.hook';
import { wrapper } from '../../../redux/store';
import Header from '../../../components/layout/header'

const useStyles = createUseStyles((theme: Theme) => ({
    bg: {
        background: theme.palette.primary[0]
    },
    wrp: {
        width: '1600px',
        maxWidth: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft: 'auto',
        paddingLeft: theme.rem(2),
        paddingRight: theme.rem(2),
        ...theme.media(500).max({
            height: 'auto',
        }),
    },
    container: { 
        display: 'flex',
        paddingRight: theme.rem(3),
        ...theme.media(1100).max({
            flexWrap: 'wrap',
            marginTop: theme.rem(10)

        }),
    },
    content: {
        width: '40%',
        margin: theme.rem(2),
        ...theme.media(1100).max({
            width: '100%'
            
        }),
    },
    title: {
        display: 'table',
        fontSize: theme.rem(3.5),
        margin: theme.rem(2, 0),
        color: theme.palette.trueBlack,
        borderRadius: theme.rem(0.6),
        background: theme.palette.white,
        boxShadow: '0px 0px 0px 6px #fff',
    },
    text: {
        display: 'inline',
        background: theme.palette.white,
        boxShadow: '0px 0px 0px 6px #fff',
        lineHeight: '2.5',
        flexDirection: 'column',
        fontSize: theme.rem(2),
        color: theme.palette.trueBlack,
        borderRadius: theme.rem(0.6),
        boxDecorationBreak: 'clone',
    },
    btn: {
        ...template(theme).btn,
        background: theme.palette.white,
        color: theme.palette.black[0],
        width: theme.rem(25),
        marginTop: theme.rem(5),
        marginRight: theme.rem(2),
        border: theme.border(0.2, 'transparent'),
        ...theme.media(1100).max({
            width: '31%',
        }),
        ...theme.media(550).max({
            width: '60%',
        }),
    },
    btnWrp: {
        display: 'flex',
        ...theme.media(500).max({
            flexDirection: 'column',
        }),

    },
    stats: {
        width: '60%',
        margin: theme.rem(2),
        ...theme.media(1100).max({
            width: '100%'
        }),
    },
    name: {
        margin: '0',
        marginLeft: 'auto',
        fontSize: '14vw',
        textTransform: 'uppercase',
        marginRight: theme.rem(15),
        color: theme.palette.gray[3],
        opacity: '0.3'
    }
}));

const Confirmation = (): ReactElement => {
    const css = useStyles();
    const auth = useAuth();

    const handleLogin = (): void => {
        if (!auth?.access_token) {
            modal.open(
                <SmallModalWrp>
                    <LoginForm />
                </SmallModalWrp>,
            );
            return;
        }
    };

    return (
        <>
            <AuthRedirect reverse />
            <Header />
            <div className={css.bg}>
                <div className={css.wrp}>
                    <div className={css.container}>
                    <div className={css.content}>
                        <h2 className={css.title}>Спасибо за регистрацию!</h2>
                        <p className={css.text}>
                            Лол кек чебурек Лол кек чебурек.
                            <span> Лол кек чебурек Лол кек чебурек Лол кек чебурек Лол кек чебурек</span>{' '}
                        </p>
                        <div className={css.btnWrp}>
                            <Link href={routes.root}>
                                <a className={css.btn}>На главную</a>
                            </Link>
                            <button className={css.btn} onClick={handleLogin}>
                                Войти
                            </button>
                        </div>
                    </div>
                      <div className={css.stats}>
                        <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, eos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam unde eaque sed fugiat est qui dignissimos, reiciendis consequatur id natus?</h1>
                      </div>
                    </div>
                    <h1 className={css.name}>phoqer</h1>
                </div>
            </div>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((ctx): void => {
    serverRedirect((ctx as unknown) as GetServerSidePropsContext, null, true);
});

export default Confirmation;
