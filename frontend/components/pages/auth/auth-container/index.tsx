import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';
import Container from '../../../layout/container';
import PageLayout from '../../../layout/page-layout';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        ...theme.media(1000).max({
            flexDirection: 'column',
        }),
    },
    form: {
        width: theme.rem(40),
        marginLeft: theme.rem(4),

        ...theme.media(1000).max({
            margin: '0',
        }),
        ...theme.media(420).max({
            width: '100%',
        }),
    },
    img: {
        height: '70vh',
        width: theme.rem(70),
        marginRight: theme.rem(4),
        borderRadius: theme.radius,
        objectFit: 'cover',

        ...theme.media(1350).max({
            width: '60%',
        }),
        ...theme.media(1000).max({
            width: '100%',
            height: '20vh',
            margin: theme.rem(0, 0, 6),
        }),
        ...theme.media(420).max({
            margin: theme.rem(0, 0, 3),
        }),
    },
}));

interface IProps {
    children: JSX.Element | JSX.Element[];
}

const AuthContainer = ({ children }: IProps): ReactElement => {
    const css = useStyles();

    return (
        <PageLayout>
            <Container>
                <div className={css.root}>
                    <img className={css.img} src="/login.jpg" alt="" />
                    <div className={css.form}>{children}</div>
                </div>
            </Container>
        </PageLayout>
    );
};

export default AuthContainer;
