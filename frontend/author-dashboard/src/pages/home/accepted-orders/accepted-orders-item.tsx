import React, { useCallback } from 'react';

import { OrderCard, AlertIcon, Order, ConfirmModal, OrderStatus, useOpen, PlayIcon, OrderInfo, SelectOption } from 'phoqer';
import { useTranslation } from 'react-i18next';

import { useErrorToast } from 'src/hook/error-toast.hook';
import { useNavigate } from 'src/hook/navigate.hook';
import { useSuccessToast } from 'src/hook/success-toast.hook';
import { CardActions } from 'src/pages/home/shared/card-actions';
import { ordersService } from 'src/services/orders.service';
import { ordersEvent } from 'src/utils/orders.utils';

interface Props {
    order: Order;
}
export const AcceptedOrdersItem = ({ order }: Props): JSX.Element => {
    const { t, i18n } = useTranslation();

    const errorToast = useErrorToast();
    const successToast = useSuccessToast();

    const navigate = useNavigate();
    const startOrder = useOpen();
    const rejectOrder = useOpen();

    const handleReject = useCallback((): Promise<void> => {
        return ordersService
            .updateOrder([order.id], OrderStatus.DONE)
            .then(ordersEvent.submit)
            .then(() =>
                successToast(t('You have successfully rejected the order'), {
                    label: t('View orders'),
                    onClick: () => {
                        navigate('/author/orders', { state: { status: OrderStatus.DONE } });
                    },
                }),
            )
            .catch(errorToast)
            .finally(rejectOrder.onClose);
    }, [errorToast, navigate, order.id, rejectOrder.onClose, successToast, t]);

    const handleStart = useCallback((): void => {
        ordersService
            .startRent(order.id)
            .then(ordersEvent.submit)
            .then(() => successToast(t('You have successfully started the rent')))
            .finally(startOrder.onClose);
    }, [order.id, startOrder.onClose, successToast, t]);

    return (
        <>
            <ConfirmModal
                open={startOrder.open}
                onClose={startOrder.onClose}
                onSubmit={handleStart}
                confirmLabel={t('Confirm')}
                cancelLabel={t('Cancel')}
            >
                {t('Are you sure you want to start this request')}
            </ConfirmModal>

            <ConfirmModal
                open={rejectOrder.open}
                onClose={rejectOrder.onClose}
                onSubmit={handleReject}
                confirmLabel={t('Confirm')}
                cancelLabel={t('Cancel')}
            >
                {t('Are you sure you want to reject this request')}
            </ConfirmModal>

            <OrderCard
                order={order}
                locale={i18n.language}
                options={
                    <>
                        <SelectOption onClick={startOrder.onOpen}>
                            <PlayIcon />
                            {t('Start')}
                        </SelectOption>

                        <SelectOption onClick={rejectOrder.onOpen}>
                            <AlertIcon />
                            {t('Reject')}
                        </SelectOption>

                        <CardActions order={order} />
                    </>
                }
            >
                <OrderInfo order={order} label={t('Waiting for start')} />
            </OrderCard>
        </>
    );
};
