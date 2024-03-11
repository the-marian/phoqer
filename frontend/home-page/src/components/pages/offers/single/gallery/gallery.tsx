import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FC, useState } from 'react';

import { GalleryModal, Image } from 'phoqer';
import { Carousel } from 'react-responsive-carousel';

import { OfferActions } from '@app/components/pages/offers/single/offer-actions/offer-actions';
import { useSingleOfferContext } from '@app/context/offers/single-offer.context';

import css from './gallery.module.scss';

export const Gallery: FC = () => {
    const { offer } = useSingleOfferContext();
    const [index, setIndex] = useState<number | undefined>();
    const onClose = (): void => setIndex(undefined);

    return (
        <div className={css.root}>
            {offer.images.length > 1 ? (
                <div className={css.carousel}>
                    <Carousel
                        infiniteLoop
                        emulateTouch
                        showThumbs={false}
                        className={css.thumb}
                        showIndicators={false}
                        onClickItem={setIndex}
                    >
                        {offer.images.map((img, index) => (
                            <Image className={css.image} key={img + index} src={img} alt={offer.title} />
                        ))}
                    </Carousel>
                </div>
            ) : (
                <img
                    className={css.singleImage}
                    src={offer.images[0]}
                    alt={offer.title}
                    onClick={() => setIndex(0)}
                    tabIndex={0}
                />
            )}

            {typeof index === 'number' ? (
                <GalleryModal index={index} media={offer.images} alt={offer.title} onClose={onClose} />
            ) : null}

            <OfferActions />
        </div>
    );
};
