import { FC } from 'react';

import { range } from 'lodash-es';
import NextLink from 'next/link';
import { Grid, GridItem, MediaProp, OfferCard, OfferCardLoader, OfferCardType } from 'phoqer';

import { UiPagination } from '@app/config/ui.config';
import { routes } from '@app/utils/routes';

import css from './offers-card-list.module.scss';

const skeletonArray = range(0, UiPagination.MD);

interface Props {
    isLoading?: boolean;
    offers: OfferCardType[];
    size?: MediaProp<number>;
}
export const OffersCardList: FC<Props> = ({ offers, isLoading = false, size = { base: 1, sm: 2, md: 3, lg: 4 } }) => {
    if (!offers.length && !isLoading) {
        return <></>;
    }

    return (
        <Grid className={css.grid} size={size}>
            {isLoading
                ? skeletonArray.map(index => (
                      <GridItem key={index}>
                          <OfferCardLoader />
                      </GridItem>
                  ))
                : offers.map(item => (
                      <NextLink key={item.id} className="grid-item" href={routes.offers.single(item.id)}>
                          <OfferCard offer={item} />
                      </NextLink>
                  ))}
        </Grid>
    );
};
