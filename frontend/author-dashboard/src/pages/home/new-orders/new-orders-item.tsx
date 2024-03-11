import React, { useCallback } from 'react';

import {
    AlertIcon,
    ConfirmModal,
    Order,
    OrderInfo,
    OrderCard,
    SelectOption,
    OrderStatus,
    CheckmarkDoneIcon,
    useOpen,
} from 'phoqer';
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
export const NewOrdersItem = ({ order }: Props): JSX.Element => {
    const { t, i18n } = useTranslation();

    const errorToast = useErrorToast();
    const successToast = useSuccessToast();

    const navigate = useNavigate();
    const rejectOrder = useOpen();
    const acceptOrder = useOpen();

    const handleUpdate = useCallback(
        (status: OrderStatus, text: string): Promise<void> => {
            return ordersService
                .updateOrder([order.id], status)
                .then(ordersEvent.submit)
                .then(() =>
                    successToast(text, {
                        label: t('View orders'),
                        onClick: () => {
                            navigate('/author/orders', { state: { status } });
                        },
                    }),
                )
                .catch(errorToast);
        },
        [errorToast, navigate, order.id, successToast, t],
    );

    const handleReject = useCallback((): void => {
        handleUpdate(OrderStatus.REJECTED, 'You have successfully rejected the order').finally(rejectOrder.onClose);
    }, [handleUpdate, rejectOrder.onClose]);

    const handleAccept = useCallback((): void => {
        handleUpdate(OrderStatus.ACCEPTED, 'You have successfully accepted the order').finally(acceptOrder.onClose);
    }, [handleUpdate, acceptOrder.onClose]);

    return (
        <>
            <ConfirmModal
                open={rejectOrder.open}
                onClose={rejectOrder.onClose}
                onSubmit={handleReject}
                confirmLabel={t('Confirm')}
                cancelLabel={t('Cancel')}
            >
                {t('Are you sure you want to reject this request?')}
            </ConfirmModal>

            <ConfirmModal
                open={acceptOrder.open}
                onClose={acceptOrder.onClose}
                onSubmit={handleAccept}
                confirmLabel={t('Confirm')}
                cancelLabel={t('Cancel')}
            >
                {t('Are you sure you want to accept this request?')}
            </ConfirmModal>

            <OrderCard
                order={order}
                locale={i18n.language}
                options={
                    <>
                        <SelectOption onClick={acceptOrder.onOpen}>
                            <CheckmarkDoneIcon />
                            <span>{t('Accept')}</span>
                        </SelectOption>

                        <SelectOption onClick={rejectOrder.onOpen}>
                            <AlertIcon />
                            {t('Reject')}
                        </SelectOption>

                        <CardActions order={order} />
                    </>
                }
            >
                <OrderInfo order={order} label={t('Waiting for your approve')} />
            </OrderCard>
        </>
    );
};
