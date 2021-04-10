import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { onlineStatus } from '../../../../../../../assets/helpers';
import routes from '../../../../../../../assets/routes';
import template from '../../../../../../../assets/template';
import { Theme } from '../../../../../../../assets/theme';
import UserAvatar from '../../../../../../common/user-avatar';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        margin: theme.rem(1, 0),
        padding: theme.rem(2),
        background: theme.palette.gray[0],
        borderRadius: theme.radius,
        color: theme.palette.black[0],
        fontSize: theme.rem(1.4),

        ...template(theme).outline,
    },
    active: {
        background: theme.palette.gray[1],
    },
    name: {
        fontSize: theme.rem(1.8),
        fontWeight: theme.text.weight[4],
    },
    inner: {
        width: '100%',
        marginLeft: theme.rem(1),
    },
    text: {
        marginTop: theme.rem(1),
        color: theme.palette.gray[3],
    },
}));

interface IProps {
    id: string | number;
    active?: boolean;
    avatar?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    date?: string | null;
    preview?: string | null;
}

const MAX_LENGTH = 45;

const ChatSidebar = ({ id, active = false, avatar, firstName = '', lastName = '', date, preview = '' }: IProps): ReactElement => {
    const css = useStyles();
    const history = useRouter();

    return (
        <Link href={routes.profile.private.messages(id)}>
            <a className={clsx(css.wrp, active && css.active)}>
                <UserAvatar firstName={firstName || ''} lastName={lastName || ''} avatar={avatar} time={date} />

                <div className={css.inner}>
                    <h2 className={css.name}>{`${firstName} ${lastName}`}</h2>
                    <p>{onlineStatus({ initDate: date, locale: history.locale })}</p>
                    <p className={css.text}>
                        {(preview || '').length > MAX_LENGTH ? preview?.slice(0, MAX_LENGTH) + '...' : preview}
                    </p>
                </div>
            </a>
        </Link>
    );
};

export default ChatSidebar;
