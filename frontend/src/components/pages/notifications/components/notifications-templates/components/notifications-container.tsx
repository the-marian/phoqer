import React, { ReactElement, useCallback, useState } from 'react';

import { faTrashAlt } from '@fortawesome/free-regular-svg-icons/faTrashAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';

import { INotification } from '../../../../../../interfaces';
import { formatTimestamp } from '../../../../../../utils/helpers';
import routes from '../../../../../../utils/routes';
import { modal } from '../../../../../common/modal';
import UserAvatar from '../../../../../common/user-avatar';
import NotificationsDeleteModal from '../../notifications-delete-modal';
import notificationsStyles from '../styles';

const useStyles = createUseStyles(notificationsStyles);

interface IProps {
    value: INotification;
    children: ReactElement;
    footer?: ReactElement;
}
const NotificationsContainer = ({ children, value, footer }: IProps): ReactElement => {
    const css = useStyles();
    const router = useRouter();
    const page = +String(router.query.page || 1);
    const [isNew, setIsNew] = useState(!value.viewed);

    const handleDelete = (): void => {
        modal.open(<NotificationsDeleteModal payload={{ id: value.id, page }} />);
    };

    const handleMouseEnter = useCallback((): void => {
        if (isNew) {
            setIsNew(false);
        }
    }, [isNew]);

    return (
        <div className={clsx(css.root, isNew && css.isNew)} onMouseEnter={handleMouseEnter} onFocus={handleMouseEnter}>
            <div className={css.header}>
                <Link href={routes.profile.public(value.recipient_id)}>
                    <a className={css.user}>
                        <UserAvatar
                            width={4}
                            height={4}
                            firstName={value.recipient_first_name}
                            lastName={value.recipient_last_name}
                        />
                        <div className={css.name}>
                            <p>
                                {value.recipient_first_name} {value.recipient_last_name}
                            </p>
                            <p className={css.date}>{formatTimestamp(value.pub_date)}</p>
                        </div>
                    </a>
                </Link>
                <div className={css.inner}>
                    <button className={css.delete} type="button" onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                    {!value.viewed && <div className={css.badge}>NEW</div>}
                </div>
            </div>
            {children}
            {footer && <div className={css.footer}>{footer}</div>}
        </div>
    );
};

export default NotificationsContainer;
