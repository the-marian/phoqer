import { FC } from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button, ChatboxIcon, Skeleton } from 'phoqer';

import { useOfferMetaContext } from '@app/context/offers/offer-meta.cpontext';
import { useSingleOfferContext } from '@app/context/offers/single-offer.context';
import { useTranslation } from '@app/hook/translations.hook';
import { routes } from '@app/utils/routes';

import css from './offer-author.module.scss';

const UserCard = dynamic(() => import('phoqer').then(module => module.UserCard), { ssr: false });

export const OfferAuthor: FC = () => {
    const { t, locale } = useTranslation();

    const { offer } = useSingleOfferContext();
    const { offerMeta, isLoading } = useOfferMetaContext();

    return (
        <div className={css.root}>
            <Link href={routes.users.single(offer.author.id)}>
                <UserCard user={offer.author} dateLabel={t('Joined in: ')} locale={locale} />
            </Link>

            {isLoading ? (
                <Skeleton className={css.skeleton} />
            ) : (
                offerMeta.canChat && (
                    <Button
                        size="sm"
                        variant="secondary"
                        className={css.chat}
                        title={t('Contact Author')}
                        rightIcon={<ChatboxIcon />}
                    >
                        {t('Contact Author')}
                    </Button>
                )
            )}
        </div>
    );
};
