import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { IPublicProfile } from '../../../../../../interfaces';
import routes from '../../../../../../utils/routes';
import mixin from '../../../../../../utils/theming/mixin';
import { Theme } from '../../../../../../utils/theming/theme';
import Button from '../../../../../common/button';

const useStyles = createUseStyles((theme: Theme) => ({
    '@keyframes init': {
        '0%': { transform: 'none' },
        '40%': { transform: 'none' },
        '50%': { transform: 'scale(0.98)' },
        '70%': { transform: 'none' },
        '80%': { transform: 'scale(0.94)' },
        '100%': { transform: 'none' },
    },
    root: {
        padding: theme.rem(2),
        borderRadius: theme.radius,
        border: theme.border(0.1, theme.palette.gray[2]),
        transition: theme.transitions[0],
        animation: '$init 1s ease-in-out 0.8s',

        ...theme.hover({
            backgroundColor: theme.palette.secondary[0],
        }),
    },
    flex: {
        display: 'flex',
        marginTop: theme.rem(2),
    },
    img: {
        height: theme.rem(6),
        width: theme.rem(6),
        marginBottom: theme.rem(3),
    },
    approve: {
        ...mixin(theme).btn,
        marginRight: theme.rem(1),
    },
    cancel: {
        ...mixin(theme).btn,
        backgroundColor: theme.palette.gray[0],
        color: theme.palette.black[0],
    },
    title: {
        fontSize: theme.rem(1.6),
        fontWeight: theme.text.weight[2],
        color: theme.palette.black[0],
    },
    link: {
        textTransform: 'capitalize',
        color: theme.palette.primary[0],

        ...theme.hover({
            textDecoration: 'underline',
        }),
        ...theme.focus({
            textDecoration: 'underline',
        }),
        fontWeight: theme.text.weight[3],
    },
}));

interface IProps {
    offerTitle: string;
    profile?: IPublicProfile | null;
}

const ChatConfirmation = ({ profile, offerTitle }: IProps): ReactElement => {
    const css = useStyles();

    return (
        <div className={css.root}>
            <img className={css.img} src="/emoji/party.png" alt="" />

            <h2 className={css.title}>
                Пользователь{' '}
                <Link href={routes.profile.public(profile?.id)}>
                    <a className={css.link}>
                        {profile?.first_name} {profile?.last_name}
                    </a>
                </Link>{' '}
                желает арендовать у вас &quot;{offerTitle}&quot;
            </h2>

            <div className={css.flex}>
                <Button className={css.approve}>Approve</Button>
                <Button className={css.cancel}>Cancel</Button>
            </div>
        </div>
    );
};

export default ChatConfirmation;
