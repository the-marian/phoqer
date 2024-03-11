import { FC } from 'react';

import { get } from 'lodash-es';
import { useRouter } from 'next/router';
import { LikeIcon, Skeleton, DislikeIcon, ID, IconButton } from 'phoqer';

import { Tooltip } from '@app/components/common/tooltip/tooltip';
import css from '@app/components/pages/offers/single/offer-actions/offer-actions.module.scss';
import { useOfferMetaContext } from '@app/context/offers/offer-meta.cpontext';
import { useErrorToast } from '@app/hook/error-toast.hook';
import { useSuccessToast } from '@app/hook/success-toast.hook';
import { useTranslation } from '@app/hook/translations.hook';
import { favoriteService } from '@app/services/favorite.service';

export const AddToFavorite: FC = () => {
    const { t } = useTranslation();
    const { offerMeta, isLoading, fetchData } = useOfferMetaContext();

    const errorToast = useErrorToast();
    const successToast = useSuccessToast();

    const router = useRouter();
    const offerId = get(router, 'query.offerId');

    const addToFavorite = async (): Promise<void> => {
        try {
            await favoriteService.addToFavorite(offerId as ID);
            await fetchData();
            successToast(t('You have successfully added this offer to your favorites list'));
        } catch {
            errorToast();
        }
    };

    const deleteFromFavorite = async (): Promise<void> => {
        try {
            await favoriteService.deleteFavorite(offerId as ID);
            await fetchData();
            successToast(t('You have successfully deleted this offer from favorites list'));
        } catch {
            errorToast();
        }
    };

    if (isLoading) {
        return <Skeleton style={{ margin: '0 1rem', height: '3rem', width: '4rem' }} />;
    }

    if (!offerMeta.canAddToFavorite) return <></>;

    return (
        <>
            {offerMeta.isInFavorite ? (
                <Tooltip label={t('Delete from favorite')}>
                    <IconButton label={t('Delete from favorite')} onClick={deleteFromFavorite}>
                        <DislikeIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip label={t('Add to favorite')}>
                    <IconButton label={t('Add to favorite')} onClick={addToFavorite}>
                        <LikeIcon />
                    </IconButton>
                </Tooltip>
            )}

            <div className={css.separator} />
        </>
    );
};
