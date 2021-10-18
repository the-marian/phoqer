import React, { ReactElement } from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import { createUseStyles } from 'react-jss';

import { INotification } from '../../../../../interfaces';
import routes from '../../../../../utils/routes';

import NotificationsContainer from './components/notifications-container';
import notificationsStyles from './styles';

const useStyles = createUseStyles(notificationsStyles);

interface IProps {
    value: INotification;
}

const NewComment = ({ value }: IProps): ReactElement => {
    const css = useStyles();
    return (
        <NotificationsContainer value={value}>
            <p className={clsx(css.text, value.viewed && css.isNewText)}>
                Пользователь{' '}
                <Link href={routes.profile.public(value.recipient_id)}>
                    <a className={css.link}>
                        {value.recipient_first_name} {value.recipient_last_name}
                    </a>
                </Link>{' '}
                оставил комментарий к вашему посту &quot;
                <Link href={routes.offers.single(value.offer_id)}>
                    <a className={css.link}>{value.offer_title}</a>
                </Link>
                &quot;.
            </p>
        </NotificationsContainer>
    );
};

export default NewComment;
