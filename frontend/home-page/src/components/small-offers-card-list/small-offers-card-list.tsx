import { FC } from 'react';

import { range } from 'lodash-es';
import NextLink from 'next/link';
import { SmallOfferCard, SmallOfferCardLoader, OfferCardType, GridItem, Grid } from 'phoqer';

import { UiPagination } from '@app/config/ui.config';
import { routes } from '@app/utils/routes';

import css from './small-offers-card-list.module.scss';

interface Props {
    loading?: boolean;
    offers: OfferCardType[];
}
export const SmallOffersCardList: FC<Props> = ({ offers, loading = false }: Props) => {
    if (!offers.length && !loading) {
        return <></>;
    }

    return (
        <Grid className={css.grid} size={{ base: 1, sm: 2, md: 3, lg: 4 }}>
            {loading
                ? range(0, UiPagination.SM + 2).map(index => (
                      <GridItem key={index}>
                          <SmallOfferCardLoader />
                      </GridItem>
                  ))
                : offers.map(item => (
                      <NextLink key={item.id} className="grid-item" href={routes.offers.single(item.id)}>
                          <SmallOfferCard offer={item} />
                      </NextLink>
                  ))}
        </Grid>
    );
};
