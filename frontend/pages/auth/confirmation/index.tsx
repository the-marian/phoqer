import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
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
import Container from '../../../components/layout/container';
import Meta from '../../../components/layout/meta';
import useAuth from '../../../hooks/auth.hook';
import useTrans from '../../../hooks/trans.hook';
import { wrapper } from '../../../redux/store';

const ConfettiWrp = dynamic(() => import('../../../components/common/confetti'));

const useStyles = createUseStyles((theme: Theme) => ({
    bg: {
        backgroundImage: 'url(/about/bg_confirmation.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
    },
    wrp: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
    },

    title: {
        fontSize: theme.rem(3.5),
        padding: theme.rem(2, 0),
        color: theme.palette.white,
    },
    text: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: theme.rem(2),
        paddingBottom: theme.rem(2.5),
        color: theme.palette.white,
    },
    btn: {
        ...template(theme).btn,
        width: theme.rem(25),
        marginTop: theme.rem(5),
        marginRight: theme.rem(2),
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
}));

const Confirmation = (): ReactElement => {
    const css = useStyles();
    const auth = useAuth();
    const trans = useTrans();

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
            <Meta title={trans('join')} h1={trans('join')} />
            {process.browser && <ConfettiWrp />}
            <div className={css.bg}>
                <Container className={css.wrp}>
                    <div>
                        <h2 className={css.title}>Спасибо за регистрацию!</h2>
                        <p className={css.text}>
                            Лол кек чебурек Лол кек чебурек.
                            <span>Лол кек чебурек Лол кек чебурек Лол кек чебурек Лол кек чебурек</span>{' '}
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
                </Container>
            </div>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((ctx): void => {
    serverRedirect((ctx as unknown) as GetServerSidePropsContext, null, true);
});

export default Confirmation;
