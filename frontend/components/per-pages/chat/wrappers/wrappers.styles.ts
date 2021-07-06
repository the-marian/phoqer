import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../utils/theming/theme';

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
        maxWidth: '20vw',
        minWidth: '20vw',
        height: '99%',
        paddingRight: theme.rem(0.5),
        marginRight: theme.rem(0.5),
        overflow: 'auto',

        '&::before': {
            content: '""',
            position: 'fixed',
            bottom: 0,
            left: 0,
            zIndex: 5,
            height: theme.rem(5),
            width: '100%',
            background: `linear-gradient(180deg, rgba(255,255,255,0) 0%, ${theme.palette.white} 55%)`,
        },

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
