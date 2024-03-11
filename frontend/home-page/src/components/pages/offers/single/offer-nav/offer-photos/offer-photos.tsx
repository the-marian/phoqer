import { FC, memo, useCallback, useEffect, useState } from 'react';

import { get, isEqual } from 'lodash-es';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserCard, Image, GalleryModal, EmptyState, ID, Button, Flex } from 'phoqer';
import { getEmptyPagination } from 'phoqer-shared';

import { EmptyField } from '@app/components/pages/offers/single/offer-nav/empty-field/empty-field';
import { OfferPhotosLoader } from '@app/components/pages/offers/single/offer-nav/offer-photos/offer-photos-loader';
import { useTranslation } from '@app/hook/translations.hook';
import { reviewsService } from '@app/services/reviews.service';
import type { OfferPhotosList, OfferPhotosType } from '@app/types/single-offer.type';
import { routes } from '@app/utils/routes';

import css from './offer-photos.module.scss';

interface Props {
    value: OfferPhotosType;
}
const OfferPhotoItem = memo<Props>(({ value }) => {
    const { t, locale } = useTranslation();
    const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
    const handleClose = (): void => setGalleryIndex(null);
    const handleOpen = (index: number) => (): void => setGalleryIndex(index);

    return (
        <>
            {typeof galleryIndex === 'number' ? (
                <GalleryModal media={value.images} onClose={handleClose} index={galleryIndex} alt={t('Offer review')} />
            ) : null}

            <Link className={css.user} href={routes.users.single(value.author.id)}>
                <UserCard user={{ ...value.author, createdAt: value.date as number }} locale={locale} />
            </Link>

            <Flex as="ul" className={css.images}>
                {value.images.map((image, index) => (
                    <li key={image}>
                        <button type="button" onClick={handleOpen(index)} className={css.button}>
                            <Image className={css.image} src={image} alt={`${value.author.firstName} ${value.author.lastName}`} />
                        </button>
                    </li>
                ))}
            </Flex>
        </>
    );
}, isEqual);

OfferPhotoItem.displayName = 'OfferPhotoItem';

export const OfferPhotos: FC = () => {
    const { t } = useTranslation();

    const router = useRouter();
    const offerId = get(router, 'query.offerId');

    const [photosList, setPhotosList] = useState<OfferPhotosList>(getEmptyPagination());
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);

    const handleLoadMoreOffers = useCallback((): void => {
        setLoadingMore(true);

        reviewsService
            .photos(offerId as ID, photosList.currentPage + 1)
            .then(data => setPhotosList(prev => ({ ...data, data: [...prev.data, ...data.data] })))
            .finally(() => setLoadingMore(false));
    }, [offerId]);

    useEffect(() => {
        reviewsService
            .photos(offerId as ID)
            .then(setPhotosList)
            .finally(() => setLoading(false));
    }, [offerId]);

    if (loading) {
        return <OfferPhotosLoader />;
    }

    if (!photosList.data.length) {
        return (
            <EmptyState type="search">
                <EmptyField offerId={offerId as ID} />
            </EmptyState>
        );
    }

    return (
        <>
            <ul>
                {photosList.data.map(value => (
                    <li key={value.id} className={css.item}>
                        <OfferPhotoItem value={value} />
                    </li>
                ))}
            </ul>

            {photosList.currentPage < photosList.totalPages && (
                <Button onClick={handleLoadMoreOffers} isLoading={loadingMore}>
                    {t('Upload ({{count}}) additional comments', {
                        count: photosList.totalItems - photosList.currentPage * photosList.limit,
                    })}
                </Button>
            )}
        </>
    );
};
