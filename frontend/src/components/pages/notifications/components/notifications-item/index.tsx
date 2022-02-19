import React, { ReactElement } from 'react';

import { createUseStyles } from 'react-jss';

import { INotification, NotificationsType } from '../../../../../interfaces';
import { Theme } from '../../../../../utils/theming/theme';
import NewComment from '../notifications-templates/new-comment';
import RentCancelled from '../notifications-templates/rent-cancelled';
import RentConfirmed from '../notifications-templates/rent-confirmed';
import RentEnd from '../notifications-templates/rent-end';
import RentStart from '../notifications-templates/rent-start';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        marginBottom: theme.rem(2),
        color: theme.palette.black[0],
    },
}));

interface IProps {
    value: INotification;
}

const NotificationsItem = ({ value }: IProps): ReactElement => {
    const css = useStyles();

    const notificationsMap = {
        [NotificationsType.RENT_REQUEST]: <RentStart value={value} />,
        [NotificationsType.RENT_END]: <RentEnd value={value} />,
        [NotificationsType.RENT_CONFIRMED]: <RentConfirmed value={value} />,
        [NotificationsType.RENT_CANCELLED]: <RentCancelled value={value} />,
        [NotificationsType.NEW_COMMENT]: <NewComment value={value} />,
    };

    return <div className={css.root}>{notificationsMap[value.notification_type]}</div>;
};

export default NotificationsItem;
