import { FC } from 'react';

import { Text, Heading } from 'src/design-system/foundation';
import { Avatar } from 'src/design-system/media/avatar';
import { useDate } from 'src/hooks/date.hook';
import { User } from 'src/types/user.type';

import css from './user-card.module.scss';

export interface UserCardProps {
    user: User;
    locale?: string;
    dateLabel?: string;
}
export const UserCard: FC<UserCardProps> = ({ user, dateLabel, locale = 'en-US' }) => {
    const date = useDate();
    const userName = user.firstName + ' ' + user.lastName;

    return (
        <div className={css.root}>
            <Avatar src={user.avatar || ''} alt={userName} className={css.avatar} />
            <div className={css.userData}>
                <Heading as="h3" size="sm" className={css.userName}>
                    {userName}
                </Heading>
                <Text size="xs" className={css.date}>
                    {dateLabel}
                    {date(user.createdAt).locale(locale).format('LLL')}
                </Text>
            </div>
        </div>
    );
};
