import React from 'react';

import { AlertIcon, ChatboxIcon, OpenIcon, ResetIcon, Order, OrderStatus, Link, Button, Flex } from 'phoqer';
import { useTranslation } from 'react-i18next';

import { useResendOrderContext } from 'src/context/resend-order.context';
import { useUpdateOrder } from 'src/hook/update-order.hook';

import css from './actions.module.scss';

interface Props {
    order: Order;
    onClose?: () => void;
}
export const Actions = ({ order, onClose }: Props): JSX.Element => {
    const { t, i18n } = useTranslation();

    const openResendModal = useResendOrderContext();
    const handleResend = (): void => {
        onClose?.();
        openResendModal(order);
    };

    const updateOrder = useUpdateOrder();
    const handleReject = (): void => {
        updateOrder([order.id as string], OrderStatus.REJECTED).then(onClose);
    };

    const canReject = order?.status === OrderStatus.PENDING;
    const canResubmit = order?.status === OrderStatus.REJECTED;

    return (
        <Flex align="center" className={css.actions}>
            <Link outline target="_blank" rel="noopener noreferrer" href={`/${i18n.language}/offers/${order.offerId}`}>
                {t('Open offer')}
                <OpenIcon />
            </Link>

            <Link outline target="_blank" rel="noopener noreferrer" href={`/${i18n.language}/offers/${order.offerId}`}>
                {t('Chat with author')}
                <ChatboxIcon />
            </Link>

            {canResubmit && (
                <Button outline onClick={handleResend}>
                    {t('Resend order')}
                    <ResetIcon />
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
