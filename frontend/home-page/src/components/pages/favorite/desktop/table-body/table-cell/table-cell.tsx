import { FC, useState } from 'react';

import { useRouter } from 'next/router';
import {
    TImages,
    useCurrency,
    Td,
    OfferCardType,
    useReduceAnimations,
    TDropdown,
    Option,
    useIsOpen,
    ID,
    ChatboxIcon,
    OpenIcon,
    DeleteIcon,
    PlayIcon,
} from 'phoqer';
import { chatsPage } from 'phoqer-shared';

import { RentDrawer } from '@app/components/modals/rent-drawer/rent-drawer';
import { sizeMap } from '@app/components/pages/favorite/desktop/table-body/utils';
import { useFavoriteContext } from '@app/context/favorite.context';
import { useTranslation } from '@app/hook/translations.hook';

import css from './table-cell.module.scss';

interface Props {
    row: OfferCardType;
    cell: string;
}
export const TableCell: FC<Props> = ({ row, cell }) => {
    const { t, locale } = useTranslation();

    const router = useRouter();
    const currency = useCurrency();
    const { isReduceAnimations } = useReduceAnimations();

    const { deleteFavorite } = useFavoriteContext();
    const { isOpen, onOpen, onClose } = useIsOpen();
    const [offerId, setOfferId] = useState<ID | null>(null);

    const offerHref = `/${router.locale}/offers/${row.id}`;
    const openOffer = (): void => {
        router.push(offerHref);
    };

    switch (cell) {
        case 'image': {
            return <TImages size={sizeMap.image} media={row.image} onClick={openOffer} />;
        }

        case 'sale': {
            return (
                <Td size={sizeMap.sale} onClick={openOffer}>
                    {(row.sale || '0') + '%'}
                </Td>
            );
        }

        case 'options': {
            return (
                <Td size={sizeMap.options}>
                    <TDropdown label={t('Options')} isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
                        <Option size="sm" leftIcon={<ChatboxIcon />} onClick={() => chatsPage.open(locale)}>
                            {t('Open chat')}
                        </Option>
                        <Option size="sm" leftIcon={<OpenIcon />} onClick={openOffer}>
                            {t('Preview offer')}
                        </Option>
                        <Option size="sm" leftIcon={<DeleteIcon />} onClick={() => deleteFavorite(row.id)}>
                            {t('Delete offer')}
                        </Option>
                        <Option size="sm" leftIcon={<PlayIcon />} onClick={() => setOfferId(row.id)}>
                            {t('Rent now')}
                        </Option>
                    </TDropdown>

                    <RentDrawer offerId={offerId as string} isOpen={Boolean(offerId)} onClose={() => setOfferId(null)} />
                </Td>
            );
        }

        case 'price': {
            return (
                <Td overflow tooltip={!isReduceAnimations} size={sizeMap[cell]} onClick={openOffer}>
                    {currency.format(row.price, router.locale) || ''}
                </Td>
            );
        }

        case 'title': {
            return (
                <Td overflow tooltip={!isReduceAnimations} size={sizeMap[cell]} className={css.link} onClick={openOffer}>
                    {row.title}
                </Td>
            );
        }

        case 'category': {
            return (
                <Td overflow tooltip={!isReduceAnimations} size={sizeMap[cell]} onClick={openOffer}>
                    {row.category}
                </Td>
            );
        }

        default: {
            return (
                <Td
                    overflow
                    size={sizeMap[cell]}
                    onClick={openOffer}
                    tooltip={Boolean(!isReduceAnimations && row[cell as keyof OfferCardType])}
                >
                    {(row[cell as keyof OfferCardType] as string) ?? '-'}
                </Td>
            );
        }
    }
};
