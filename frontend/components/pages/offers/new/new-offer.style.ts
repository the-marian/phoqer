import { Styles } from 'jss';

import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';

interface Template {
    end: {
        success: Styles;
        title: Styles;
        text: Styles;
        flex: Styles;
        btn: Styles;
        primary: Styles;
    };
    step: {
        form: Styles;
        red: Styles;
        inner: Styles;
        title: Styles;
        subtitle: Styles;
        icon: Styles;
        flex: Styles;
        input: Styles;
        textarea: Styles;
        inputWrp: Styles;
        inactive: Styles;
        saveWrp: Styles;
        save: Styles;
        btnWrp: Styles;
        next: Styles;
        btn: Styles;
        disabled: Styles;
        errors: Styles;
        errorsText: Styles;
    };
}

const newOfferTemplate = (theme: Theme): Template => ({
    end: {
        success: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            fontSize: theme.rem(1.6),

            '& svg': {
                width: theme.rem(5),
                height: theme.rem(5),

                '& circle': {
                    fill: theme.palette.green,
                },
            },
        },
        title: {
            maxWidth: theme.rem(50),
            margin: '2rem auto',
            color: theme.palette.green[0],
        },
        text: {
            maxWidth: theme.rem(50),
            margin: '0 auto',
            color: theme.palette.black[0],
        },
        flex: {
            display: 'flex',
            marginTop: theme.rem(3),

            ...theme.media(768).max({
                flexWrap: 'wrap',
                justifyContent: 'center',
            }),
        },
        btn: {
            ...template(theme).btn,
            background: theme.palette.gray[0],
            color: theme.palette.black[0],

            ...theme.media(768).max({
                width: '80%',
                marginBottom: theme.rem(2),
            }),
        },
        primary: {
            marginLeft: theme.rem(2),
            background: theme.palette.green[0],
            color: theme.palette.trueWhite,

            ...theme.media(768).max({
                marginLeft: '0',
            }),
        },
    },
    step: {
        form: {
            padding: theme.rem(3, 10),
            borderRadius: theme.radius,
            background: theme.palette.secondary[0],
            maxWidth: theme.rem(80),
            margin: '0 auto',
            color: theme.palette.black[0],
            fontSize: theme.rem(1.4),

            '& > p': {
                marginTop: theme.rem(4),
            },

            ...theme.media(768).max({
                padding: theme.rem(1.5),
            }),
        },
        red: {
            color: theme.palette.red[0],
        },
        inner: {
            margin: theme.rem(3, 0),
        },
        title: {
            marginBottom: theme.rem(1),
            fontSize: theme.rem(1.4),
            fontWeight: theme.text.weight[2],
        },
        subtitle: {
            margin: theme.rem(2, 0),
            fontSize: theme.rem(1.4),
            fontWeight: theme.text.weight[2],
            color: theme.palette.gray[4],
        },
        icon: {
            fontSize: theme.rem(0.91),
            marginRight: theme.rem(1.5),
        },
        flex: {
            display: 'flex',
            justifyContent: 'space-between',

            '& > div': {
                flexBasis: '48%',
            },

            ...theme.media(768).max({
                display: 'block',
            }),
        },
        input: {
            color: theme.palette.trueBlack,
            background: theme.palette.trueWhite,
        },
        textarea: {
            ...template(theme).input,
            width: '100%',
            height: theme.rem(10),
            padding: theme.rem(2),
            boxShadow: theme.shadow[1],
        },
        inputWrp: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        inactive: {
            pointerEvents: 'none',
            opacity: '0.4',
        },
        saveWrp: {
            display: 'flex',
            margin: theme.rem(2, 0),

            ...theme.media(768).max({
                flexDirection: 'column',
            }),
        },
        save: {
            height: theme.rem(5),
            padding: theme.rem(1, 2),
            background: theme.palette.trueWhite,
            fontSize: theme.rem(1.4),
            borderRadius: theme.radius,
            boxShadow: theme.shadow[1],

            '& svg': {
                width: theme.rem(1.6),
                height: theme.rem(1.6),
                marginRight: theme.rem(1),
            },

            ...theme.media(768).max({
                padding: theme.rem(1.6, 1),
            }),
        },
        btnWrp: {
            display: 'flex',
            justifyContent: 'flex-end',
            margin: theme.rem(6, 0, 4),

            ...theme.media(768).max({
                flexDirection: 'column',
                margin: theme.rem(0, 0, 2),
            }),
        },
        next: {
            height: theme.rem(5),
            padding: theme.rem(1, 4),
            marginLeft: theme.rem(2),
            background: theme.palette.primary[0],
            fontSize: theme.rem(1.4),
            color: theme.palette.trueWhite,
            borderRadius: theme.radius,

            ...theme.media(768).max({
                margin: theme.rem(2, 0, 0),
                padding: theme.rem(2, 4),
            }),
        },
        btn: {
            ...template(theme).btn,
            marginLeft: theme.rem(2),
            background: theme.palette.trueWhite,
            color: theme.palette.trueBlack,

            '& svg': {
                width: theme.rem(1.6),
                height: theme.rem(1.6),
                marginRight: theme.rem(1),
            },

            ...theme.media(768).max({
                margin: theme.rem(1.6, 0, 0),
                padding: theme.rem(1, 2),
            }),
        },
        disabled: {
            opacity: '0.5',
            pointerEvents: 'none',
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
    },
});

export default newOfferTemplate;
