import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';
import useMedia from '../../../hooks/media.hook';
import Logo from '../../common/logo';
import Socials from '../../common/socials';
import Container from '../container';
import SiteMap from './site-map';

const useStyles = createUseStyles((theme: Theme) => ({
    footer: {
        padding: theme.rem(8, 0),
        background: theme.palette.gray[0],
        color: theme.palette.black[0],
    },
    wrp: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.rem(4),

        ...theme.media(1100).max({
            display: 'block',
            textAlign: 'center',
        }),
    },
}));

const Footer = (): ReactElement => {
    const css = useStyles();
    const mobile = useMedia(1100);
    return (
        <footer className={css.footer}>
            <Container>
                <Logo center={!mobile} />
                <div className={css.wrp}>
                    <SiteMap />
                    <Socials center={!mobile} />
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
