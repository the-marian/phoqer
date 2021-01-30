import clsx from 'clsx';
import React, { ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import Slider from 'react-slick';

import { Theme } from '../../../../assets/theme';
import { modal } from '../../../Common/Modal';
import FullPageGallery from '../../../Common/Modal/FullPageGallery';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'block',
        width: '100%',
    },
    inner: {
        position: 'relative',
        width: '100%',
        margin: theme.rem(0, 0, 3),
        '@media (max-width: 768px)': {
            margin: theme.rem(0, 0, 1),
        },

        '& .slick-track': {
            display: 'flex',
        },
        '& .slick-list': {
            overflow: 'hidden',
        },
        '& .slick-current.slick-center img': {
            border: theme.border(0.5, theme.palette.primary[0]),
        },
        '& .slick-arrow': {
            position: 'absolute',
            top: 0,
            height: theme.rem(60),
            width: theme.rem(10),
            fontSize: 0,
            transition: theme.transitions[0],

            '@media (max-width: 1400px)': {
                width: theme.rem(6),
            },

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
            '@media (max-width: 1400px)': {
                left: theme.rem(-5),
            },

            '&::before': {
                borderTop: theme.border(0.2, theme.palette.gray[3]),
                borderLeft: theme.border(0.2, theme.palette.gray[3]),
                transition: theme.transitions[0],
            },

            '&:hover': {
                left: theme.rem(-9),
                '@media (max-width: 1400px)': {
                    left: theme.rem(-6),
                },
            },
        },
        '& .slick-arrow.slick-next': {
            right: theme.rem(-8),
            borderRadius: `0 ${theme.radius} ${theme.radius} 0`,
            '@media (max-width: 1400px)': {
                right: theme.rem(-5),
            },

            '&::before': {
                left: '25%',
                borderBottom: theme.border(0.2, theme.palette.gray[3]),
                borderRight: theme.border(0.2, theme.palette.gray[3]),
                transition: theme.transitions[0],
            },

            '&:hover': {
                right: theme.rem(-9),
                '@media (max-width: 1400px)': {
                    right: theme.rem(-6),
                },
            },
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
        background: theme.palette.gray[1],
        cursor: 'zoom-in',

        '@media (max-width: 768px)': {
            height: theme.rem(30),
        },
    },
    bottom: {
        display: 'block',
        width: '100%',
        height: theme.rem(15),
        objectFit: 'cover',
        cursor: 'pointer',

        '@media (max-width: 510px)': {
            height: theme.rem(9),
        },
    },
}));

interface IProps {
    images: { id?: number | null; url: string }[];
}

let slider1 = null;
let slider2 = null;

const OfferSlider = ({ images }: IProps): ReactElement => {
    const css = useStyles();
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);

    useEffect(() => {
        setNav1(slider1);
        setNav2(slider2);
    }, []);

    const slides = images?.length < 5 ? [...images, ...images, ...images] : images;

    const handleNav = (index = 0) => (): void => {
        slider1?.slickGoTo(index);
    };

    const handleModal = index => (): void => {
        modal.open(<FullPageGallery images={images.map(item => item.url)} index={index} />);
    };

    return (
        <div className={css.flex}>
            <Slider
                key={1}
                ref={slider => (slider1 = slider)}
                asNavFor={nav2}
                slidesToShow={1}
                slidesToScroll={1}
                initialSlide={0}
                draggable
                arrows
                infinite
                className={css.inner}
                responsive={[
                    {
                        breakpoint: 1050,
                        settings: {
                            arrows: false,
                        },
                    },
                ]}
            >
                {slides.map(({ id, url }, index) => (
                    <div className={css.slide} key={id}>
                        <img className={css.img} onClick={handleModal(index)} draggable={false} src={url} aria-hidden alt="" />
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
                ref={slider => (slider2 = slider)}
                asNavFor={nav1}
                arrows={false}
                draggable
                infinite
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
                {slides.map(({ id, url }, index) => (
                    <div className={css.slide} key={id} onClick={handleNav(index)} aria-hidden>
                        <img className={clsx(css.img, css.bottom)} draggable={false} src={url} alt="" />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default OfferSlider;
