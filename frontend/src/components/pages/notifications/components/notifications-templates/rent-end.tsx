import React, { ReactElement } from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import { createUseStyles } from 'react-jss';

import { INotification } from '../../../../../interfaces';
import routes from '../../../../../utils/routes';
import Button from '../../../../common/button';

import NotificationsContainer from './components/notifications-container';
import notificationsStyles from './styles';

const useStyles = createUseStyles(notificationsStyles);

interface IProps {
    value: INotification;
}

const RentEnd = ({ value }: IProps): ReactElement => {
    const css = useStyles();
    return (
        <NotificationsContainer value={value} footer={<Button className={css.btn}>Оставить отзыв</Button>}>
            <p className={clsx(css.text, value.viewed && css.isNewText)}>
                Пользователь{' '}
                <Link href={routes.profile.public(value.recipient_id)}>
                    <a className={css.link}>
                        {value.recipient_first_name} {value.recipient_last_name}
                    </a>
                </Link>{' '}
                подтвердил окончание аренды товара/услуги &quot;
                <Link href={routes.offers.single(value.offer_id)}>
                    <a className={css.link}>{value.offer_title}</a>
                </Link>
                &quot;.
                <br />
                <br />
                Было бы замечательно получить ваш отзыв! В случае позитивного опыта аренды вы таким образом сможете поблагодарить
                автора объявления, в противном случае это будет полезным указанием другим пользователям.
            </p>
        </NotificationsContainer>
    );
};

export default RentEnd;
