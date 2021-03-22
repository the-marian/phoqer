import { Styles } from 'jss';

import template from '../../../assets/template';
import { Theme } from '../../../assets/theme';

interface Template {
    end: {
        success: Styles;
        title: Styles;
        text: Styles;
        flex: Styles;
        btn: Styles;
        primary: Styles;
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
        },
        flex: {
            display: 'flex',
            marginTop: theme.rem(3),

            '@media(max-width: 560px)': {
                flexWrap: 'wrap',
                justifyContent: 'center',
            },
        },
        btn: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: theme.rem(6),
            padding: theme.rem(1, 2),
            background: theme.palette.gray[0],
            color: theme.palette.black[0],
            borderRadius: theme.radius,
            boxShadow: theme.shadow[1],

            '@media(max-width: 560px)': {
                width: '80%',
                marginBottom: theme.rem(2),
            },

            ...template(theme).outline,
        },
        primary: {
            marginLeft: theme.rem(2),
            background: theme.palette.green[0],
            color: theme.palette.trueWhite,

            '@media(max-width: 560px)': {
                marginLeft: 0,
            },
        },
    },
});

export default newOfferTemplate;
