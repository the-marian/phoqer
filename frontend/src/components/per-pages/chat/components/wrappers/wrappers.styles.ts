import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../utils/theming/theme';
import { width } from '../../chat.config';

const useWrapperStyles = createUseStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: 'calc(100vh - 6.5rem)',
        flexGrow: 2,
        padding: theme.rem(0, 2),
        fontSize: theme.rem(1.6),
        color: theme.palette.black[0],

        ...theme.media(1060).max({
            height: 'unset',
            padding: theme.rem(0, 0, 1),
        }),
    },
    sidebar: theme.media(1060).max({
        height: 'unset',
    }),
    aside: {
        maxWidth: width.desktopLg.sidebar,
        minWidth: width.desktopLg.sidebar,
        height: '99%',
        paddingRight: theme.rem(0.5),
        overflow: 'auto',

        ...theme.media(1500).max({
            maxWidth: width.desktopSm.sidebar,
            minWidth: width.desktopSm.sidebar,
        }),

        ...theme.media(1060).max({
            minWidth: 'unset',
            maxWidth: 'unset',
            height: 'unset',
            width: '100%',
            padding: theme.rem(0, 1.5),
            overflow: 'unset',
        }),
    },
    inner: {
        height: 'auto',
        padding: theme.rem(0.1),
        ...theme.media(1060).max({
            height: 'unset',
        }),
    },
}));

export default useWrapperStyles;
