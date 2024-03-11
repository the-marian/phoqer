import React from 'react';

import classNames from 'classnames';
import {
    ChatboxIcon,
    OpenIcon,
    AlertIcon,
    ResetIcon,
    SelectOption,
    TDropdown,
    useOpen,
    EyeIcon,
    Order,
    OrderStatus,
} from 'phoqer';
import { useTranslation } from 'react-i18next';

import { useResendOrderContext } from 'src/context/resend-order.context';
import { useUpdateOrder } from 'src/hook/update-order.hook';

import css from './table-dropdown.module.scss';

interface Props {
    order: Order;
    onPreview: () => void;
}
export const TableDropdown = ({ order, onPreview }: Props): JSX.Element => {
    const { t, i18n } = useTranslation();
    const { open, onClose, onOpen } = useOpen();

    const openResendModal = useResendOrderContext();
    const handleResend = (): void => openResendModal(order);

    const updateOrder = useUpdateOrder();
    const handleReject = (): Promise<void> => updateOrder([order.id as string], OrderStatus.REJECTED).then(onClose);

    const openOffer = (): void => {
        onClose();
        window.open(`/${i18n.language}/offers/${order.offerId}`);
    };

    const openChat = (): void => {
        onClose();
        // get chat id here
        window.open(`/${i18n.language}/chat/${order.user.id}`);
    };

    const canReject = order.status === OrderStatus.PENDING;
    const canResubmit = order.status === OrderStatus.REJECTED;

    return (
        <TDropdown open={open} onClose={onClose} onOpen={onOpen} label={t('Options')}>
            <SelectOption className={css.select} onClick={onPreview}>
                <EyeIcon />
                <span>{t('Preview order')}</span>
            </SelectOption>

            <SelectOption className={css.select} onClick={openOffer}>
                <OpenIcon />
                <span>{t('Open offer')}</span>
            </SelectOption>

            <SelectOption className={css.select} onClick={openChat}>
                <ChatboxIcon />
                <span>{t('Chat with author')}</span>
            </SelectOption>

            {canResubmit && (
                <SelectOption className={css.select} onClick={handleResend}>
                    <ResetIcon />
                    <span>{t('Resend order')}</span>
                </SelectOption>
            )}

            {canReject && (
                <SelectOption className={classNames(css.select, css.reject)} onClick={handleReject}>
                    <AlertIcon />
                    <span>{t('Reject order')}</span>
                </SelectOption>
            )}
        </TDropdown>
    );
};
