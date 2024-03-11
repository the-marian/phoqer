import React from 'react';

import classNames from 'classnames';
import {
    AlertIcon,
    CheckmarkDoneIcon,
    HappyIcon,
    Order,
    OrderStatus,
    SyncIcon,
    Text,
    TimeIcon,
    Tooltip,
    TypographySize,
} from 'phoqer';
import { useReduceAnimations } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import css from './status.module.scss';

interface Props {
    order: Order;
}
export const Status = ({ order }: Props): JSX.Element => {
    const { t } = useTranslation();
    const { isReduceAnimations } = useReduceAnimations();

    switch (order.status) {
        case OrderStatus.DONE: {
            return (
                <Tooltip disabled={isReduceAnimations} label={t('Done')}>
                    <div className={classNames(css.status, css.done)}>
                        <HappyIcon />
                        <Text as="span" size={TypographySize.SM}>
                            {t('Done')}
                        </Text>
                    </div>
                </Tooltip>
            );
        }

        case OrderStatus.REJECTED: {
            return (
                <Tooltip disabled={isReduceAnimations} label={t('Rejected')}>
                    <div className={classNames(css.status, css.rejected)}>
                        <AlertIcon />
                        <Text as="span" size={TypographySize.SM}>
                            {t('Rejected')}
                        </Text>
                    </div>
                </Tooltip>
            );
        }

        case OrderStatus.PENDING: {
            return (
                <Tooltip disabled={isReduceAnimations} label={t('Pending')}>
                    <div className={classNames(css.status, css.pending)}>
                        <TimeIcon />
                        <Text as="span" size={TypographySize.SM}>
                            {t('Pending')}
                        </Text>
                    </div>
                </Tooltip>
            );
        }

        case OrderStatus.ACCEPTED: {
            return (
                <Tooltip disabled={isReduceAnimations} label={t('Accepted - pending for start')}>
                    <div className={classNames(css.status, css.accepted)}>
                        <CheckmarkDoneIcon />
                        <Text as="span" size={TypographySize.SM}>
                            {t('Accepted')}
                        </Text>
                    </div>
                </Tooltip>
            );
        }

        case OrderStatus.IN_PROGRESS: {
            return (
                <Tooltip disabled={isReduceAnimations} label={t('Rent in progress')}>
                    <div className={classNames(css.status, css.progress)}>
                        <SyncIcon />
                        <Text as="span" size={TypographySize.SM}>
                            {t('In progress')}
                        </Text>
                    </div>
                </Tooltip>
            );
        }

        default:
            return <></>;
    }
};
