import React from 'react';

import {
    ChatboxIcon,
    OpenIcon,
    AlertIcon,
    CheckmarkDoneIcon,
    PlayIcon,
    SelectOption,
    TDropdown,
    useOpen,
    EyeIcon,
    HappyIcon,
    Order,
    OrderStatus,
} from 'phoqer';
import { chatsPage } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { useStartRent } from 'src/hook/start-rent.hook';
import { useUpdateOrder } from 'src/hook/update-order.hook';

import css from './table-dropdown.module.scss';

interface Props {
    order: Order;
    onPreview: () => void;
}
export const TableDropdown = ({ order, onPreview }: Props): JSX.Element => {
    const { t, i18n } = useTranslation();
    const { open, onClose, onOpen } = useOpen();

    const updateOrder = useUpdateOrder();
    const handleStart = useStartRent();

    const handleReject = (): Promise<void> => updateOrder([order.id as string], OrderStatus.REJECTED).then(onClose);
    const handleAccept = (): Promise<void> => updateOrder([order.id as string], OrderStatus.ACCEPTED).then(onClose);
    const handleDone = (): Promise<void> => updateOrder([order.id as string], OrderStatus.DONE).then(onClose);

    const openOffer = (): void => {
        onClose();
        window.open(`/${i18n.language}/offers/${order.offerId}`);
    };

    const openChat = (): void => {
        onClose();
        chatsPage.open(i18n.language);
    };

    const canReject = order?.status === OrderStatus.PENDING || order?.status === OrderStatus.ACCEPTED;
    const canAccept = order.status === OrderStatus.REJECTED || order.status === OrderStatus.PENDING;
    const canStart = order.status === OrderStatus.ACCEPTED;
    const canDone = order.status === OrderStatus.IN_PROGRESS;

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

            {canAccept && (
                <SelectOption className={css.select} onClick={handleAccept}>
                    <CheckmarkDoneIcon />
                    <span>{t('Accepted order')}</span>
                </SelectOption>
            )}

            {canReject && (
                <SelectOption className={css.select} onClick={handleReject}>
                    <AlertIcon />
                    <span>{t('Reject order')}</span>
                </SelectOption>
            )}

            {canStart && (
                <SelectOption className={css.select} onClick={() => handleStart(order.id, onClose)}>
                    <PlayIcon />
                    <span>{t('Start rent')}</span>
                </SelectOption>
            )}

            {canDone && (
                <SelectOption className={css.select} onClick={handleDone}>
                    <HappyIcon />
                    <span>{t('Mark as Done')}</span>
                </SelectOption>
            )}
        </TDropdown>
    );
};
