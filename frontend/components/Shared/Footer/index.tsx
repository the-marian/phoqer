import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';
import useMedia from '../../../hooks/media.hook';
import Socials from '../../Common/Socials';
import Container from '../../Layout/Container';
import Logo from '../../Layout/Logo';
import SiteMap from './SiteMap';
import Warning from './Warning';

const useStyles = createUseStyles((theme: Theme) => ({
    footer: {
        padding: theme.rem(8, 0),
        background: theme.palette.gray[1],
        color: theme.palette.black[0],
    },
    wrp: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.rem(4),

        '@media (max-width: 768px)': {
            display: 'block',
            textAlign: 'center',
        },
    },
}));

const Footer = (): ReactElement => {
    const css = useStyles();
    const mobile = useMedia(768);
    return (
        <footer className={css.footer}>
            <Warning />
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