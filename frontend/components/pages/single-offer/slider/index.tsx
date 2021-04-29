import clsx from 'clsx';
import React, { ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import Slider from 'react-slick';

import { Theme } from '../../../../assets/theme';
import { modal } from '../../../common/modal';
import FullPageGallery from '../../../common/modal/full-page-gallery';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'block',
        width: '100%',
    },
    inner: {
        position: 'relative',
        width: '100%',
        margin: theme.rem(0, 0, 3),

        ...theme.media(768).max({
            margin: theme.rem(0, 0, 1),
        }),

        '& .slick-track': {
            display: 'flex',
        },
        '& .slick-list': {
            overflow: 'hidden',
        },
        '& .slick-current.slick-center img': {
            border: theme.border(0.2, theme.palette.primary[0]),
        },
        '& .slick-arrow': {
            position: 'absolute',
            top: 0,
            height: theme.rem(60),
            width: theme.rem(10),
            fontSize: 0,
            transition: theme.transitions[0],

            ...theme.media(1400).max({
                width: theme.rem(6),
            }),

            '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '60%',
                transform: 'translateY(-50%) rotate(-45deg)',
                height: theme.rem(1.5),
                width: theme.rem(1.5),
            },
        },

        '& .slick-arrow.slick-prev': {
            left: theme.rem(-8),
            borderRadius: `${theme.radius} 0 0 ${theme.radius}`,
            ...theme.media(1400).max({
                left: theme.rem(-5),
            }),

            '&::before': {
                borderTop: theme.border(0.2, theme.palette.gray[3]),
                borderLeft: theme.border(0.2, theme.palette.gray[3]),
                transition: theme.transitions[0],
            },

            ...theme.hover({
                left: theme.rem(-9),
                ...theme.media(1400).max({
                    left: theme.rem(-6),
                }),
            }),
        },
        '& .slick-arrow.slick-next': {
            right: theme.rem(-8),
            borderRadius: `0 ${theme.radius} ${theme.radius} 0`,
            ...theme.media(1400).max({
                right: theme.rem(-5),
            }),

            '&::before': {
                left: '25%',
                borderBottom: theme.border(0.2, theme.palette.gray[3]),
                borderRight: theme.border(0.2, theme.palette.gray[3]),
                transition: theme.transitions[0],
            },

            ...theme.hover({
                right: theme.rem(-9),
                ...theme.media(1400).max({
                    right: theme.rem(-6),
                }),
            }),
        },
    },
    padding: {
        '& .slick-slide': {
            padding: theme.rem(0, 1),
        },
    },
    slide: {
        width: '100%',
        outline: 'none',
        borderRadius: theme.radius,
    },
    img: {
        display: 'block',
        height: theme.rem(60),
        borderRadius: theme.radius,
        objectFit: 'contain',
        background: '#323232',
        cursor: 'zoom-in',

        ...theme.media(768).max({
            height: theme.rem(50),
        }),

        ...theme.media(500).max({
            height: theme.rem(30),
        }),
    },
    bottom: {
        display: 'block',
        width: '100%',
        height: theme.rem(15),
        objectFit: 'cover',
        cursor: 'pointer',

        ...theme.media(510).max({
            height: theme.rem(9),
        }),
    },
}));

interface IProps {
    images: string[];
}

let slider1: Slider | undefined;
let slider2: Slider | undefined;

const OfferSlider = ({ images }: IProps): ReactElement => {
    const css = useStyles();
    const [nav1, setNav1] = useState<Slider | undefined>();
    const [nav2, setNav2] = useState<Slider | undefined>();

    useEffect(() => {
        setNav1(slider1);
        setNav2(slider2);
    }, []);

    const slides = images?.length < 5 ? [...images, ...images, ...images] : images;

    const handleNav = (index = 0) => (): void => {
        slider1?.slickGoTo(index);
    };

    const handleModal = (): void => {
        modal.open(<FullPageGallery images={images} />);
    };

    return (
        <div className={css.flex}>
            <Slider
                key={1}
                ref={slider => (slider1 = slider || undefined)}
                asNavFor={nav2}
                slidesToShow={1}
                slidesToScroll={1}
                initialSlide={0}
                draggable
                arrows
                infinite
                className={css.inner}
                lazyLoad="progressive"
                responsive={[
                    {
                        breakpoint: 1050,
                        settings: {
                            arrows: false,
                        },
                    },
                ]}
            >
                {slides.map(item => (
                    <div className={css.slide} key={item}>
                        <img className={css.img} onClick={handleModal} draggable={false} src={item} aria-hidden="true" alt="" />
                    </div>
                ))}
            </Slider>

            <Slider
                key={2}
                slidesToShow={4}
                slidesToScroll={1}
                initialSlide={0}
                swipeToSlide
                centerMode
                ref={slider => (slider2 = slider || undefined)}
                asNavFor={nav1}
                arrows={false}
                draggable
                infinite
                lazyLoad="progressive"
                className={clsx(css.inner, css.padding)}
                responsive={[
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 3,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                ]}
            >
                {slides.map((item, index) => (
                    <div className={css.slide} key={item} onClick={handleNav(index)} aria-hidden="true">
                        <img className={clsx(css.img, css.bottom)} draggable={false} src={item} alt="" />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default OfferSlider;
