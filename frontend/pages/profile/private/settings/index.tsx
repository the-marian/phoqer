import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { serverRedirect } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import Meta from '../../../../components/Common/Meta';
import ProfileNav from '../../../../components/Common/NavTabs/ProfileNav';
import AuthRedirect from '../../../../components/HOC/Auth/AuthRedirect';
import Container from '../../../../components/Layout/Container';
import Main from '../../../../components/Shared/TagMain';
import useTrans from '../../../../hooks/trans.hook';
import { wrapper } from '../../../../redux/store';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(6, 0, 2),
        fontSize: theme.rem(1.6),
        color: theme.palette.black[0],
    },
    flex: {
        display: 'flex',
    },
    img: {
        display: 'block',
        height: theme.rem(20),
        width: theme.rem(20),
        marginBottom: theme.rem(2),
        borderRadius: '50%',
        objectFit: 'cover',
    },
    file: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.palette.primary[0],
        fontWeight: theme.text.weight[3],
        padding: theme.rem(2),
        borderRadius: theme.radius,

        '&:hover': {
            background: theme.palette.gray[0],
        },

        '& span': {
            marginLeft: theme.rem(1),
        },

        '& input': {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 2,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
        },
    },
}));

const Settings = (): ReactElement => {
    const T = useTrans();
    const css = useStyles();

    return (
        <>
            <Meta title={'Мои обьявления'} h1={T.user_profile_on_phoqer} />
            <AuthRedirect />
            <Main>
                <Container>
                    <ProfileNav active="settings" />
                    <div className={css.root}>
                        <div className={css.flex}>
                            <div className="inner">
                                <img className={css.img} src="/about.jpg" alt="" />
                                <div className={css.file}>
                                    <FontAwesomeIcon icon={faRedo} />
                                    <span>Изменить фото</span>
                                    <input type="file" />
                                </div>
                            </div>
                            <div className="inner"></div>
                        </div>
                    </div>
                </Container>
            </Main>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    async (ctx): Promise<void> => {
        serverRedirect((ctx as unknown) as GetServerSidePropsContext);
    },
);

export default Settings;
