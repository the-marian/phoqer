import React, { ReactElement } from 'react';

import Link from 'next/link';
import { createUseStyles } from 'react-jss';

import { IPublicProfile } from '../../../../../../interfaces';
import routes from '../../../../../../utils/routes';
import mixin from '../../../../../../utils/theming/mixin';
import { Theme } from '../../../../../../utils/theming/theme';
import Button from '../../../../../common/button';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        padding: theme.rem(2),
        borderRadius: theme.radius,
        backgroundColor: theme.palette.gray[0],
        transition: theme.transitions[0],
        boxShadow: theme.shadow[1],

        ...theme.hover({
            boxShadow: theme.shadow[2],
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
            <h2 className={css.title}>
                Пользователь{' '}
                <Link href={routes.profile.public(profile?.id)}>
                    <a className={css.link}>
                        {profile?.first_name} {profile?.last_name}
                    </a>
                </Link>{' '}
                желает арендовать у вас &quot;{offerTitle}&quot;.
            </h2>

            <div className={css.flex}>
                <Button primary className={css.approve}>
                    Одобрить запрос
                </Button>
                <Button className={css.cancel}>Отклонить</Button>
            </div>
        </div>
    );
};

export default ChatConfirmation;
