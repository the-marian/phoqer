import { FC } from 'react';

import classNames from 'classnames';
import { useReduceAnimations } from 'src/context';
import { Tooltip } from 'src/design-system/feedback/tooltip/tooltip';
import { Text } from 'src/design-system/foundation';
import { CheckmarkDoneIcon, HappyIcon, SyncIcon, TimeIcon, AlertIcon } from 'src/design-system/icons';
import { MediaProp, OrderStatus } from 'src/types';
import { getCssClass } from 'src/utils';

import css from './status-badge.module.scss';

export interface StatusProps {
    status: string;
    type?: MediaProp<'icon' | 'text'>;
    locale?: Record<string, string>;
}

export const StatusBadge: FC<StatusProps> = ({ status, type = 'icon', locale = {} }) => {
    const { isReduceAnimations } = useReduceAnimations();

    return (
        <>
            {status === OrderStatus.DONE && (
                <>
                    <Tooltip disabled={isReduceAnimations} label={locale.Done ?? 'Done'}>
                        <div className={classNames(css.status, css.done, getCssClass('type', type))}>
                            <HappyIcon />

                            <Text as="span" size="sm">
                                {locale.Done ?? 'Done'}
                            </Text>
                        </div>
                    </Tooltip>
                </>
            )}

            {status === OrderStatus.REJECTED && (
                <Tooltip disabled={isReduceAnimations} label={locale.Rejected ?? 'Rejected'}>
                    <div className={classNames(css.status, getCssClass('type', type), css.rejected)}>
                        <AlertIcon />

                        <Text as="span" size="sm">
                            {locale.Rejected ?? 'Rejected'}
                        </Text>
                    </div>
                </Tooltip>
            )}

            {status === 'disabled' && (
                <Tooltip disabled={isReduceAnimations} label={locale.Disabled ?? 'Disabled'}>
                    <div className={classNames(css.status, getCssClass('type', type), css.rejected)}>
                        <AlertIcon />

                        <Text as="span" size="sm">
                            {locale.Disabled ?? 'Disabled'}
                        </Text>
                    </div>
                </Tooltip>
            )}

            {status === OrderStatus.PENDING && (
                <Tooltip disabled={isReduceAnimations} label={locale.Pending ?? 'Pending'}>
                    <div className={classNames(css.status, getCssClass('type', type), css.pending)}>
                        <TimeIcon />

                        <Text as="span" size="sm">
                            {locale.Pending ?? 'Pending'}
                        </Text>
                    </div>
                </Tooltip>
            )}

            {status === OrderStatus.ACCEPTED && (
                <Tooltip disabled={isReduceAnimations} label={locale.Accepted ?? 'Accepted'}>
                    <div className={classNames(css.status, getCssClass('type', type), css.accepted)}>
                        <CheckmarkDoneIcon />

                        <Text as="span" size="sm">
                            {locale.Accepted ?? 'Accepted'}
                        </Text>
                    </div>
                </Tooltip>
            )}

            {status === 'active' && (
                <Tooltip disabled={isReduceAnimations} label={locale.Active ?? 'Active'}>
                    <div className={classNames(css.status, getCssClass('type', type), css.accepted)}>
                        <CheckmarkDoneIcon />

                        <Text as="span" size="sm">
                            {locale.Active ?? 'Active'}
                        </Text>
                    </div>
                </Tooltip>
            )}

            {status === OrderStatus.IN_PROGRESS && (
                <Tooltip disabled={isReduceAnimations} label={locale.Progress ?? 'In progress'}>
                    <div className={classNames(css.status, getCssClass('type', type), css.progress)}>
                        <SyncIcon />

                        <Text as="span" size="sm">
                            {locale.Progress ?? 'In progress'}
                        </Text>
                    </div>
                </Tooltip>
            )}
        </>
    );
};
