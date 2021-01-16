import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';
import Logo from '../../Common/Logo';
import Socials from '../../Pages/Socials';
import Container from '../Container';
import SiteMap from './SiteMap';

const useStyles = createUseStyles((theme: Theme) => ({
    footer: {
        padding: theme.rem(8, 0),
        // background: theme.palette.soft[2],
    },
    wrp: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.rem(4),

        '@media (max-width: 640px)': {
            display: 'block',
        },
    },
}));

const Footer = (): ReactElement => {
    const css = useStyles();
    return (
        <footer className={css.footer}>
            <Container>
                <Logo />
                <div className={css.wrp}>
                    <SiteMap />
                    <Socials />
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
