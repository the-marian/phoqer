import React from 'react';

import {
    AlertIcon,
    ChatboxIcon,
    OpenIcon,
    PlayIcon,
    CheckmarkDoneIcon,
    HappyIcon,
    Order,
    OrderStatus,
    Flex,
    Link,
    Button,
} from 'phoqer';
import { chatsPage } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { useStartRent } from 'src/hook/start-rent.hook';
import { useUpdateOrder } from 'src/hook/update-order.hook';

import css from './actions.module.scss';

interface Props {
    order: Order;
    onClose?: () => void;
}
export const Actions = ({ order, onClose }: Props): JSX.Element => {
    const { t, i18n } = useTranslation();

    const handleStart = useStartRent();

    const updateOrder = useUpdateOrder();
    const handleReject = (): void => {
        updateOrder([order.id as string], OrderStatus.REJECTED).then(onClose);
    };
    const handleAccept = (): void => {
        updateOrder([order.id as string], OrderStatus.ACCEPTED).then(onClose);
    };
    const handleDone = (): void => {
        updateOrder([order.id as string], OrderStatus.DONE).then(onClose);
    };

    const canStart = order.status === OrderStatus.ACCEPTED;
    const canReject = order?.status === OrderStatus.PENDING || order?.status === OrderStatus.ACCEPTED;
    const canAccept = order?.status === OrderStatus.PENDING || order?.status === OrderStatus.REJECTED;
    const canDone = order?.status === OrderStatus.IN_PROGRESS;

    return (
        <Flex align="center" className={css.actions}>
            <Link outline target="_blank" rel="noopener noreferrer" href={`/${i18n.language}/offers/${order.offerId}`}>
                {t('Open offer')}
                <OpenIcon />
            </Link>

            {canStart && (
                <Button outline onClick={() => handleStart(order.id)}>
                    {t('Start rent')}
                    <PlayIcon />
                </Button>
            )}

            <Button outline onClick={() => chatsPage.open(i18n.language)}>
                {t('Chat with client')}
                <ChatboxIcon />
            </Button>

            {canAccept && (
                <Button outline onClick={handleAccept}>
                    {t('Accepted order')}
                    <CheckmarkDoneIcon />
                </Button>
            )}

            {canDone && (
                <Button outline onClick={handleDone}>
                    {t('Mark as Done')}
                    <HappyIcon />
                </Button>
            )}

            {canReject && (
                <Button outline onClick={handleReject}>
                    {t('Reject order')}
                    <AlertIcon />
                </Button>
            )}
        </Flex>
    );
};
