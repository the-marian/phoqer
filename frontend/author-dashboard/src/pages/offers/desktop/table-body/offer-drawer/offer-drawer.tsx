import React, { MouseEvent } from 'react';

import {
    Offer,
    List,
    Drawer,
    Loader,
    OfferCard,
    OpenIcon,
    EditIcon,
    CloseIcon,
    DeleteIcon,
    ModalHeader,
    ListLinkItem,
    ListButtonItem,
    CheckmarkDoneIcon,
} from 'phoqer';
import { OffersStatus, useOffersContext } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { offersService } from 'src/services/offers.service';

import css from './offer-drawer.module.scss';

interface Props {
    offer?: Offer | null;
    onClose: () => void;
}
export const OfferDrawer = ({ offer, onClose }: Props): JSX.Element => {
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
        <Drawer open={Boolean(offer)} onClose={onClose} className={css.drawer}>
            <ModalHeader size="lg" onClose={onClose} autoFocus>
                {t('Offer info')}
            </ModalHeader>

            <div className={css.inner}>
                {offer ? (
                    <>
                        <a href={`/${i18n.language}/offers/${offer.id}`} target="_blank" rel="noopener noreferrer">
                            <OfferCard
                                offer={{
                                    ...offer,
                                    authorId: 1,
                                    image: offer.images[0],
                                    category: offer.category.title,
                                    sale: offer.sale?.percentage,
                                }}
                                locale={i18n.language}
                            />
                        </a>

                        <List className={css.list}>
                            <ListLinkItem icon={<OpenIcon />} href={`/${i18n.language}/offers/${offer.id}`}>
                                {t('Open offer')}
                            </ListLinkItem>

                            <ListLinkItem
                                icon={<EditIcon />}
                                onClick={handleEdit}
                                href={`/${i18n.language}/author/offers/${offer.id}`}
                            >
                                {t('Edit offer')}
                            </ListLinkItem>

                            {offer.status === OffersStatus.ACTIVE ? (
                                <ListButtonItem icon={<CloseIcon />}>{t('Deactivate offer')}</ListButtonItem>
                            ) : (
                                <ListButtonItem icon={<CheckmarkDoneIcon />}>{t('Activate offer')}</ListButtonItem>
                            )}

                            <ListButtonItem onClick={handleDeleteOffer} icon={<DeleteIcon />} className={css.delete}>
                                {t('Delete offer')}
                            </ListButtonItem>
                        </List>
                    </>
                ) : (
                    <div className={css.loader}>
                        <Loader color="primary" absolute />
                    </div>
                )}
            </div>
        </Drawer>
    );
};
