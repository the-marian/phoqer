import React, { ReactElement } from 'react';

import Link from 'next/link';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { ChatStatus, IPublicProfile, IState } from '../../../../../interfaces';
import routes from '../../../../../utils/routes';
import { Theme } from '../../../../../utils/theming/theme';
import ChatDeleteButton from '../chat-delete-button';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        padding: theme.rem(2),
        borderRadius: theme.radius,
        backgroundColor: theme.palette.gray[0],
        transition: theme.transitions[0],
        boxShadow: theme.shadow[1],
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
    title: {
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[2],
        color: theme.palette.black[0],
        '& strong': {
            fontWeight: 'inherit',
        },
    },
    link: {
        textTransform: 'capitalize',
        color: theme.palette.primary[0],
        fontWeight: theme.text.weight[4],

        ...theme.hover({
            textDecoration: 'underline',
        }),
        ...theme.focus({
            textDecoration: 'underline',
        }),
    },
}));

interface IProps {
    offerTitle: string;
    profile?: IPublicProfile | null;
}

const ChatConfirmation = ({ profile, offerTitle }: IProps): ReactElement => {
    const css = useStyles();
    const chatStatus = useSelector<IState, ChatStatus>(state => state.chat.item.data?.status || ChatStatus.NEW);

    const contentMap = {
        [ChatStatus.NEW]: (
            <h2 className={css.title}>
                Пользователь{' '}
                <Link href={routes.profile.public(profile?.id)}>
                    <a className={css.link}>
                        {profile?.first_name} {profile?.last_name}
                    </a>
                </Link>{' '}
                желает арендовать у вас &quot;<strong>{offerTitle}</strong>&quot;.
            </h2>
        ),
        [ChatStatus.APPROVED]: (
            <h2 className={css.title}>
                Вы одобрили запрос пользователя{' '}
                <Link href={routes.profile.public(profile?.id)}>
                    <a className={css.link}>
                        {profile?.first_name} {profile?.last_name}
                    </a>
                </Link>{' '}
                на аренду &quot;<strong>{offerTitle}</strong>&quot;.
            </h2>
        ),
        [ChatStatus.ARCHIVED]: <h2>Аренда этого объявления закончилась и чат находится в архиве.</h2>,
    };

    return (
        <div className={css.root}>
            {contentMap[chatStatus]}

            <ChatDeleteButton className={css.flex} />
        </div>
    );
};

export default ChatConfirmation;
