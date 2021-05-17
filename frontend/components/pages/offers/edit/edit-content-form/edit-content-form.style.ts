import { Styles } from 'jss';

import template from '../../../../../assets/template';
import { Theme } from '../../../../../assets/theme';

interface Template {
    flex: Styles;
    inner: Styles;
    title: Styles;
    subtitle: Styles;
    textarea: Styles;
    red: Styles;
    errors: Styles;
    errorsText: Styles;
    mark: Styles;
    region: Styles;
    group: Styles;
    inactive: Styles;
    submit: Styles;
    save: Styles;
}

const editOfferTemplate = (theme: Theme): Template => ({
    flex: {
        display: 'flex',
        justifyContent: 'space-between',

        '& > div': {
            flexBasis: '48%',
        },

        ...theme.media(1200).max({
            flexWrap: 'wrap',
            '& > div': {
                flexBasis: '100%',
            },
            '& > div:nth-of-type(2)': {
                marginTop: '0',
            },
        }),

        ...theme.media(500).max({
            display: 'block',
        }),
    },
    inner: {
        margin: theme.rem(3, 0),
    },
    title: {
        margin: theme.rem(0, 0, 4),

        '&:not(:nth-of-type(1))': {
            margin: theme.rem(4, 0),
        },
    },
    subtitle: {
        marginBottom: theme.rem(1),
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[2],
    },
    textarea: {
        ...template(theme).input,
        width: '100%',
        height: theme.rem(10),
        background: theme.palette.gray[1],
        padding: theme.rem(2),
        color: theme.palette.black[0],
    },
    red: {
        color: theme.palette.red[0],
    },
    errors: {
        border: theme.border(0.1, theme.palette.red[0]),
        borderRadius: theme.radius,
    },
    errorsText: {
        marginTop: theme.rem(1),
        color: theme.palette.red[0],
        fontSize: theme.rem(1.2),
    },
    mark: {
        margin: theme.rem(1, 0, 4),
        fontSize: theme.rem(1.2),
    },
    region: {
        ...template(theme).btn,
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        background: theme.palette.gray[1],
        color: theme.palette.black[0],

        '& span': {
            textAlign: 'left',
            width: 'calc(100% - 2.5rem)',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        },
    },
    group: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    inactive: {
        pointerEvents: 'none',
        opacity: '0.4',
    },
    submit: {
        ...template(theme).btn,
        background: theme.palette.primary[0],

        ...theme.media(768).max({
            width: '100%',
        }),
    },
    save: {
        ...template(theme).btn,
        marginRight: theme.rem(2),
        background: theme.palette.gray[1],
        color: theme.palette.black[0],

        ...theme.media(768).max({
            width: '100%',
            margin: theme.rem(0, 0, 2),
        }),
    },
});

export default editOfferTemplate;
