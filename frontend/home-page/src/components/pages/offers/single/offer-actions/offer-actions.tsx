import { FC } from 'react';

import { get } from 'lodash-es';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import {
    Button,
    ChevronRightIcon,
    DeleteIcon,
    EditIcon,
    Heading,
    IconButton,
    ID,
    ShareIcon,
    Skeleton,
    Text,
    useCurrency,
    useIsOpen,
} from 'phoqer';
import { authModal, useAuthContext } from 'phoqer-shared';

import { Link } from '@app/components/common/link/link';
import { Tooltip } from '@app/components/common/tooltip/tooltip';
import type { RentDrawerProps } from '@app/components/modals/rent-drawer/rent-drawer';
import { AddToFavorite } from '@app/components/pages/offers/single/offer-actions/add-to-favorite/add-to-favorite';
import { useOfferMetaContext } from '@app/context/offers/offer-meta.cpontext';
import { useSingleOfferContext } from '@app/context/offers/single-offer.context';
import { useTranslation } from '@app/hook/translations.hook';
import { routes } from '@app/utils/routes';

import css from './offer-actions.module.scss';

const RentDrawer = dynamic<RentDrawerProps>(
    () => import('@app/components/modals/rent-drawer/rent-drawer').then(module => module.RentDrawer),
    { ssr: false },
);

export const OfferActions: FC = () => {
    const { t, locale } = useTranslation();
    const { auth } = useAuthContext();

    const currency = useCurrency();
    const { offer } = useSingleOfferContext();
    const { offerMeta, isLoading } = useOfferMetaContext();

    const router = useRouter();
    const offerId = get(router, 'query.offerId');

    const { isOpen, onOpen, onClose } = useIsOpen(false);

    return (
        <>
            <div className={css.root}>
                <div className={css.flex}>
                    <Heading size="md" className={css.price}>
                        {currency.format(offer.price, locale)}
                        {t('(per day)')}
                    </Heading>

                    <div className={css.buttons}>
                        <Tooltip label={t('Share')}>
                            <IconButton label={t('Share')}>
                                <ShareIcon />
                            </IconButton>
                        </Tooltip>

                        <div className={css.separator} />

                        <AddToFavorite />

                        {isLoading ? (
                            <Skeleton style={{ margin: '0 1rem', height: '3rem', width: '12rem' }} />
                        ) : (
                            <>
                                {offerMeta.canDelete && (
                                    <>
                                        <Tooltip label={t('Delete offer')}>
                                            <IconButton label={t('Delete offer')}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>

                                        <div className={css.separator} />
                                    </>
                                )}

                                {offerMeta.canEdit && (
                                    <Link
                                        size="sm"
                                        variant="secondary"
                                        href={routes.offers.edit(offerId as ID)}
                                        rightIcon={<EditIcon />}
                                    >
                                        {t('Edit offer')}
                                    </Link>
                                )}

                                {offerMeta.canRent && (
                                    <Button
                                        size="sm"
                                        className={css.ml2}
                                        variant="secondary"
                                        onClick={auth ? onOpen : authModal.submit}
                                        rightIcon={<ChevronRightIcon />}
                                    >
                                        {t('Rent now')}
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {offer.sale ? (
                    <div className={css.sale}>
                        <Heading size="md" className={css.percentage}>
                            {t('Sale')}: {offer.sale.percentage}%
                        </Heading>
                        <Text size="sm" className={css.description}>
                            {offer.sale.description}
                        </Text>
                    </div>
                ) : null}
            </div>

            <RentDrawer offerId={offerId as ID} isOpen={isOpen} onClose={onClose} />
        </>
    );
};
