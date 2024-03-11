import { FC, ReactNode, useState } from 'react';

import { TabList, TabItem } from 'phoqer';

import { OfferAuthor } from '@app/components/pages/offers/single/offer-nav/offer-author/offer-author';
import { OfferPhotos } from '@app/components/pages/offers/single/offer-nav/offer-photos/offer-photos';
import { useSingleOfferContext } from '@app/context/offers/single-offer.context';
import { useTranslation } from '@app/hook/translations.hook';

import css from './offer-nav.module.scss';
import { OfferOverview } from './offer-overview/offer-overview';
import { OfferReviews } from './offer-reviews/offer-reviews';

enum TabsEnum {
    OVERVIEW,
    REVIEWS,
    RATING,
    PHOTOS,
}

const content: { [key in TabsEnum]: ReactNode } = {
    [TabsEnum.OVERVIEW]: <OfferOverview />,
    [TabsEnum.REVIEWS]: <OfferReviews />,
    [TabsEnum.PHOTOS]: <OfferPhotos />,
    [TabsEnum.RATING]: <OfferPhotos />,
};

export const OfferNav: FC = () => {
    const { t } = useTranslation();

    const { offer } = useSingleOfferContext();
    const [tab, setTab] = useState<TabsEnum>(TabsEnum.OVERVIEW);

    return (
        <div className={css.root}>
            <OfferAuthor />

            <TabList className={css.tabs}>
                <TabItem isActive={tab === TabsEnum.OVERVIEW}>
                    <button type="button" onClick={() => setTab(TabsEnum.OVERVIEW)}>
                        {t('Overview')}
                    </button>
                </TabItem>
                <TabItem isActive={tab === TabsEnum.REVIEWS}>
                    <button type="button" onClick={() => setTab(TabsEnum.REVIEWS)}>
                        {t('Reviews')} <small>({offer.reviews})</small>
                    </button>
                </TabItem>
                <TabItem isActive={tab === TabsEnum.RATING}>
                    <button type="button" onClick={() => setTab(TabsEnum.RATING)}>
                        {t('Rating')}
                    </button>
                </TabItem>
                <TabItem isActive={tab === TabsEnum.PHOTOS}>
                    <button type="button" onClick={() => setTab(TabsEnum.PHOTOS)}>
                        {t('Photos')}
                    </button>
                </TabItem>
            </TabList>

            <div className={css.content}>{content[tab]}</div>
        </div>
    );
};
