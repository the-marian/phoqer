import React, { useCallback } from 'react';

import { OrderCard, StopIcon, Order, ConfirmModal, OrderStatus, useOpen, OrderTimer, SelectOption } from 'phoqer';
import { useReduceAnimations } from 'phoqer-shared';
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
export const InProgressOrdersItem = ({ order }: Props): JSX.Element => {
    const { t, i18n } = useTranslation();

    const errorToast = useErrorToast();
    const successToast = useSuccessToast();
    const { isReduceAnimations } = useReduceAnimations();

    const navigate = useNavigate();
    const { open, onOpen, onClose } = useOpen();

    const handleUpdate = useCallback((): void => {
        ordersService
            .updateOrder([order.id], OrderStatus.DONE)
            .then(ordersEvent.submit)
            .then(() =>
                successToast(t('You have successfully stopped the rent'), {
                    label: t('View orders'),
                    onClick: () => {
                        navigate('/author/orders', { state: { status: OrderStatus.DONE } });
                    },
                }),
            )
            .then(onClose)
            .catch(errorToast);
    }, [errorToast, navigate, onClose, order.id, successToast, t]);

    return (
        <>
            <ConfirmModal
                open={open}
                onClose={onClose}
                onSubmit={handleUpdate}
                confirmLabel={t('Confirm')}
                cancelLabel={t('Cancel')}
            >
                {t('Are you sure you want to mark this rent as Done')}
            </ConfirmModal>

            <OrderCard
                order={order}
                locale={i18n.language}
                options={
                    <>
                        <SelectOption onClick={onOpen}>
                            <StopIcon />
                            {t('Stop Rent')}
                        </SelectOption>

                        <CardActions order={order} />
                    </>
                }
            >
                <OrderTimer
                    order={order}
                    label={t('time has passed')}
                    locale={i18n.language}
                    isReduceAnimations={isReduceAnimations}
                />
            </OrderCard>
        </>
    );
};
