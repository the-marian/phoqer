import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { IOfferCard, IPublicProfile, IRecentOffers, IState } from '../interfaces';

import useAuth from './auth.hook';

const KEY = 'RECENT_OFFERS';
const MAX_LENGTH = 14;
const MAX_TO_SHOW_LENGTH = 12;

interface RecentOffers {
    get(): IRecentOffers[];
    set(value: unknown): void;
}

export const useRecentOffers = (): RecentOffers => {
    const router = useRouter();
    const offerId = String(router.query?.offerId || '');

    const { token } = useAuth();
    const user = useSelector<IState, IPublicProfile | null>(state => state.user);

    return {
        get(): IRecentOffers[] {
            try {
                const value = localStorage.getItem(KEY);
                return value
                    ? (JSON.parse(value) as IRecentOffers[])
                          .filter(item => item.id !== offerId)
                          .slice(0, MAX_TO_SHOW_LENGTH)
                          .sort((a, b) => b.date - a.date)
                    : [];
            } catch {
                return [];
            }
        },
        set(offer: IOfferCard) {
            try {
                if (token?.access_token && offer.user_id === user?.id) return;

                const offers = this.get();
                const index = offers.findIndex(({ id }) => id === offer.id);

                if (index === -1) {
                    offers.unshift({
                        id: offer.id,
                        title: offer.title,
                        img: offer.cover_image,
                        date: Date.now(),
                    });
                } else {
                    offers[index].date = Date.now();
                }

                localStorage.setItem(KEY, JSON.stringify(offers.slice(0, MAX_LENGTH)));
            } catch (e) {
                console.log(e);
            }
        },
    };
};
