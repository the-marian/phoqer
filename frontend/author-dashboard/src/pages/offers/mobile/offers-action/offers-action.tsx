import React, { MouseEvent } from 'react';

import { Button, Link, Flex, Overflow, Offer, OpenIcon, AlertIcon, EditIcon, DeleteIcon } from 'phoqer';
import { OffersStatus, useOffersContext } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { offersService } from 'src/services/offers.service';

import css from './offers-action.module.scss';

interface Props {
    offer: Offer;
}
export const OffersAction = ({ offer }: Props): JSX.Element => {
    const { t, i18n } = useTranslation();
    const { deleteOffer } = useOffersContext();

    const navigate = useNavigate();
    const location = useLocation();

    const handleEdit = (event: MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        navigate(event.currentTarget.pathname, { state: { from: location } });
    };

    const handleDeleteOffer = (): void => {
        if (offer?.id) {
            offersService.deleteOffer(offer.id).then(() => deleteOffer(offer.id));
        }
    };

    return (
        <>
            <Flex align="center" className={css.actions}>
                <Link outline href={`/${i18n.language}/offers/${offer.id}`}>
                    {t('Open offer')}
                    <OpenIcon />
                </Link>

                <Link outline href={`/${i18n.language}/author/offers/${offer.id}`} onClick={handleEdit}>
                    {t('Edit offer')}
                    <EditIcon />
                </Link>

                {offer.status === OffersStatus.ACTIVE ? (
                    <Button outline>
                        {t('Deactivate offer')} <AlertIcon />
                    </Button>
                ) : (
                    <Button outline>{t('Activate offer')} </Button>
                )}

                <Button outline onClick={handleDeleteOffer} className={css.delete}>
                    {t('Delete offer')}
                    <DeleteIcon />
                </Button>
            </Flex>

            <Overflow className={css.overflow} key={offer.id} locale={{ more: t('Show more'), less: t('Show less') }}>
                <div className={css.description} dangerouslySetInnerHTML={{ __html: offer.description }} />
            </Overflow>
        </>
    );
};
