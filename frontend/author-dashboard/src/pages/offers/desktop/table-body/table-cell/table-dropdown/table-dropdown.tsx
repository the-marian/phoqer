import React, { useState } from 'react';

import { OpenIcon, SelectOption, TDropdown, useOpen, EditIcon, DeleteIcon, CloseIcon, CheckmarkDoneIcon, Offer } from 'phoqer';
import { OffersStatus, useOffersContext } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { offersService } from 'src/services/offers.service';

import css from './table-dropdown.module.scss';

interface Props {
    offer: Offer;
}
export const TableDropdown = ({ offer }: Props): JSX.Element => {
    const { t, i18n } = useTranslation();
    const { deleteOffer } = useOffersContext();

    const navigate = useNavigate();
    const location = useLocation();

    const { open, onClose, onOpen } = useOpen();
    const [isLoading, setIsLoading] = useState(false);

    const openOffer = (): void => {
        window.open(`/${i18n.language}/offers/${offer.id}`);
    };

    const editOffer = (): void => {
        navigate(`/${i18n.language}/author/offers/${offer.id}`, { state: { from: location } });
    };

    const handleDeleteOffer = (): void => {
        setIsLoading(true);
        offersService
            .deleteOffer(offer.id)
            .then(() => deleteOffer(offer.id))
            .finally(() => setIsLoading(false));
    };

    return (
        <TDropdown open={open} onClose={onClose} onOpen={onOpen} label={t('Options')}>
            <SelectOption className={css.select} onClick={openOffer}>
                <OpenIcon />
                <span>{t('Open offer')}</span>
            </SelectOption>

            <SelectOption className={css.select} onClick={editOffer}>
                <EditIcon />
                <span>{t('Edit offer')}</span>
            </SelectOption>

            {offer.status === OffersStatus.ACTIVE ? (
                <SelectOption className={css.select} onClick={editOffer} disabled={isLoading}>
                    <CloseIcon />
                    <span>{t('Deactivate offer')}</span>
                </SelectOption>
            ) : (
                <SelectOption className={css.select} onClick={editOffer} disabled={isLoading}>
                    <CheckmarkDoneIcon />
                    <span>{t('Activate offer')}</span>
                </SelectOption>
            )}

            <SelectOption className={css.delete} onClick={handleDeleteOffer} disabled={isLoading}>
                <DeleteIcon />
                <span>{t('Delete offer')}</span>
            </SelectOption>
        </TDropdown>
    );
};
