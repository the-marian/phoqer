import React, { ReactElement } from 'react';

import { createUseStyles } from 'react-jss';

import useAuth from '../../../hooks/auth.hook';
import { Theme } from '../../../utils/theming/theme';
import Logo from '../../common/logo';
import Container from '../container';

import Lang from './lang';
import NotAuth from './not-auth';
import UserInfo from './user-info';

const useStyles = createUseStyles((theme: Theme) => ({
    header: {
        position: 'relative',
        zIndex: 10000,
        width: '100%',
        transition: theme.transitions[0],
        background: theme.palette.gray[0],

        ...theme.media(768).max({
            background: theme.palette.white,
            padding: theme.rem(0.3, 0),
        }),
    },
    flex: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    wrp: {
        display: 'flex',
        alignItems: 'center',
    },
}));

const Header = (): ReactElement => {
    const { token } = useAuth();
    const css = useStyles();

    return (
        <header className={css.header}>
            <Container>
                <div className={css.flex}>
                    <Logo link />

                    <div className={css.wrp}>
                        <Lang />
                        {token.access_token ? <UserInfo /> : <NotAuth />}
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
