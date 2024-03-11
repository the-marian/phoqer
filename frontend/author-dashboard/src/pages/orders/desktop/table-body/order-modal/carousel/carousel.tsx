import React from 'react';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Image } from 'phoqer';
import { Carousel as InnerCarousel } from 'react-responsive-carousel';

import css from './carousel.module.scss';

interface Props {
    title: string;
    images: string[];
}
export const Carousel = ({ title, images }: Props): JSX.Element => {
    return (
        <>
            {images.length > 1 ? (
                <div className={css.carousel}>
                    <InnerCarousel infiniteLoop emulateTouch showThumbs={false} className={css.thumb} showIndicators={false}>
                        {images.map((img, index) => (
                            <Image className={css.image} key={img + index} src={img} alt={title} />
                        ))}
                    </InnerCarousel>
                </div>
            ) : (
                <Image className={css.singleImage} src={images[0]} alt={title} />
            )}
        </>
    );
};
