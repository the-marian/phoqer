import React from 'react';

import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';

import { ChatTypeEnum } from '../../../../../interfaces';
import routes from '../../../../../utils/routes';
import { Theme } from '../../../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    header: {
        height: theme.rem(5),
        paddingTop: theme.rem(1),
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        padding: theme.rem(0, 2),
    },
    inner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: 'calc(100% / 3)',
    },
    right: {
        justifyContent: 'flex-end',
    },
    left: {
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: theme.rem(2),
        fontWeight: theme.text.weight[4],
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        borderRadius: theme.radius,
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[3],
        color: theme.palette.primary[0],

        ...theme.hover({
            textDecoration: 'underline',
        }),

        '& svg': {
            marginLeft: theme.rem(0.5),
            fontSize: theme.rem(1.6),
        },
    },
}));

export const ChatHeader = (): JSX.Element => {
    const css = useStyles();

    const history = useRouter();
    const type = String(history.query.type || '');

    const href = routes.chat.list(type === ChatTypeEnum.AUTHOR ? ChatTypeEnum.CLIENT : ChatTypeEnum.AUTHOR);

    return (
        <div className={css.header}>
            <div className={css.container}>
                <div className={clsx(css.inner, css.left)}>
                    <Link href={href}>
                        <a className={css.link}>
                            <span>{type === ChatTypeEnum.AUTHOR ? 'Я арендую' : 'Я сдаю в аренду'}</span>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </a>
                    </Link>
                </div>
                <div className={css.inner}>
                    <h2 className={css.title}>{type === ChatTypeEnum.AUTHOR ? 'Я сдаю в аренду' : 'Я арендую'}</h2>
                </div>
                <div className={clsx(css.inner, css.right)} />
            </div>
        </div>
    );
};
