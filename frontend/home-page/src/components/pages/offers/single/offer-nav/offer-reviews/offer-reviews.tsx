import { FC, useCallback, useEffect, useState } from 'react';

import { get, range } from 'lodash-es';
import { useRouter } from 'next/router';
import { Comment, EmptyState, ReviewListType, ID, Button, CommentLoader } from 'phoqer';
import { getEmptyPagination } from 'phoqer-shared';

import { EmptyField } from '@app/components/pages/offers/single/offer-nav/empty-field/empty-field';
import { useTranslation } from '@app/hook/translations.hook';
import { reviewsService } from '@app/services/reviews.service';
import { routes } from '@app/utils/routes';

import css from './offer-reviews.module.scss';

export const OfferReviews: FC = () => {
    const { t } = useTranslation();

    const router = useRouter();
    const offerId = get(router, 'query.offerId');
    const navigate = (id: ID) => router.push(routes.users.single(id));

    const [reviews, setReviews] = useState<ReviewListType>(getEmptyPagination());
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);

    const [replies, setReplies] = useState<Record<string, ReviewListType>>({});
    const [loadingReplies, setLoadingReplies] = useState<Record<string, boolean>>({});

    useEffect(() => {
        reviewsService
            .reviews(offerId as ID)
            .then(setReviews)
            .finally(() => setLoading(false));
    }, [offerId]);

    const getReplies = useCallback(
        (id: ID) => (): void => {
            if (replies[id]?.data?.length) return;
            setLoadingReplies(prev => ({ ...prev, [id]: true }));

            reviewsService
                .replies(offerId as ID, id)
                .then(data => setReplies(prev => ({ ...prev, [id]: data })))
                .finally(() => setLoadingReplies(prev => ({ ...prev, [id]: false })));
        },
        [offerId],
    );

    const handleLoadMoreOffers = useCallback((): void => {
        setLoadingMore(true);
        reviewsService
            .reviews(offerId as ID, reviews.currentPage + 1)
            .then(data => setReviews(prev => ({ ...data, data: [...prev.data, ...data.data] })))
            .finally(() => setLoadingMore(false));
    }, [offerId]);

    if (loading) {
        return (
            <div className={css.loader}>
                {range(0, 4).map(index => (
                    <CommentLoader key={index} />
                ))}
            </div>
        );
    }

    if (!reviews.data.length) {
        return (
            <EmptyState type="comments">
                <EmptyField offerId={offerId as ID} />
            </EmptyState>
        );
    }

    return (
        <div className={css.root}>
            {reviews.data.map(item => (
                <Comment
                    key={item.id}
                    value={item}
                    onUserClick={navigate}
                    loading={loadingReplies[item.id]}
                    onToggleReplies={getReplies(item.id)}
                >
                    {replies[item.id]?.data?.length
                        ? replies[item.id]?.data?.map(sub => <Comment key={sub.id} value={sub} onUserClick={navigate} />)
                        : null}
                </Comment>
            ))}

            {reviews.currentPage < reviews.totalPages && (
                <Button onClick={handleLoadMoreOffers} isLoading={loadingMore}>
                    {t('Upload ({{count}}) additional comments', {
                        count: reviews.totalItems - reviews.currentPage * reviews.limit,
                    })}
                </Button>
            )}
        </div>
    );
};
