import { FC, useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Button, ChatboxIcon, ChevronRightIcon, DeleteIcon, Flex, ID, OfferCardType, OpenIcon } from 'phoqer';
import { chatsPage } from 'phoqer-shared';

import { Link } from '@app/components/common/link/link';
import { RentDrawerProps } from '@app/components/modals/rent-drawer/rent-drawer';
import { useFavoriteContext } from '@app/context/favorite.context';
import { useTranslation } from '@app/hook/translations.hook';

import css from './favorite-details.module.scss';

const RentDrawer = dynamic<RentDrawerProps>(
    () => import('@app/components/modals/rent-drawer/rent-drawer').then(module => module.RentDrawer),
    { ssr: false },
);

interface Props {
    favorite: OfferCardType;
}
export const FavoriteDetails: FC<Props> = ({ favorite }) => {
    const { t, locale } = useTranslation();
    const router = useRouter();
    const offerHref = `/${locale}/offers/${favorite.id}`;

    const { deleteFavorite } = useFavoriteContext();
    const [offerId, setOfferId] = useState<ID | null>(null);

    const openOffer = (): void => {
        router.push(offerHref);
    };

    return (
        <Flex align="center" className={css.flex}>
            <Link variant="secondary" href={offerHref} onClick={openOffer} rightIcon={<OpenIcon />}>
                {t('Open offer')}
            </Link>

            <Button variant="secondary" onClick={() => chatsPage.open(locale)} rightIcon={<ChatboxIcon />}>
                {t('Open chat')}
            </Button>

            <Button variant="secondary" onClick={() => setOfferId(favorite.id)}>
                {t('Rent now')}
                <ChevronRightIcon />
            </Button>

            <Button
                variant="secondary"
                onClick={() => deleteFavorite(favorite.id)}
                aria-label={t('Delete offer from favorite')}
                rightIcon={<DeleteIcon />}
            >
                {t('Delete')}
            </Button>

            <RentDrawer offerId={offerId as string} isOpen={Boolean(offerId)} onClose={() => setOfferId(null)} />
        </Flex>
    );
};
