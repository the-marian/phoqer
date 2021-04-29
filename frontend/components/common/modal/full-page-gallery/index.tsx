import clsx from 'clsx';
import React, { ReactElement, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import Slider from 'react-slick';

import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';
import FullPageModal from '../full-page-modal';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        width: '100%',
        height: '100%',
        cursor: 'grab',

        '& .slick-track': {
            display: 'flex',
            alignItems: 'center',
            height: '100%',
        },
        '& .slick-slide': {
            maxHeight: 'calc(100vh - 5rem)',
        },
        '& .slick-slide > div': {
            maxHeight: 'calc(100vh - 5rem)',
        },
        '& .slick-list': {
            height: '100%',
            overflow: 'hidden',
        },
        '& .slick-arrow': {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            height: theme.rem(5),
            width: theme.rem(5),
            fontSize: 0,
            transition: theme.transitions[0],
            background: theme.palette.gray[4],
            ...template(theme).outline,

            ...theme.media(768).max({
                top: 'unset',
                bottom: '0',
                transform: 'translateY(calc(-100% - 1rem))',
            }),

            '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '60%',
                transform: 'translateY(-50%) rotate(-45deg)',
                height: theme.rem(1),
                width: theme.rem(1),
            },
        },

        '& .slick-arrow.slick-prev': {
            left: theme.rem(2),
            borderRadius: theme.radius,

            '&::before': {
                left: '42%',
                borderTop: theme.border(0.3, theme.palette.white),
                borderLeft: theme.border(0.3, theme.palette.white),
                transition: theme.transitions[0],
            },
        },
        '& .slick-arrow.slick-next': {
            right: theme.rem(2),
            borderRadius: theme.radius,

            '&::before': {
                left: '35%',
                borderBottom: theme.border(0.3, theme.palette.white),
                borderRight: theme.border(0.3, theme.palette.white),
                transition: theme.transitions[0],
            },
        },
    },
    mobile: {
        '& .slick-arrow': {
            top: 'unset',
            bottom: '0',
            transform: 'translateY(calc(-100% - 1rem))',
        },
    },
    slide: {
        width: '100%',
        height: '100%',
        maxHeight: 'calc(100vh - 5rem)',
    },
    img: {
        width: '100%',
        height: '100%',
        maxHeight: 'calc(100vh - 5rem)',
        objectFit: 'contain',
        objectPosition: 'center',
    },
    dots: {
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        fontSize: theme.rem(1.6),
        color: theme.palette.trueWhite,

        ...theme.media(768).max({
            bottom: theme.rem(6),
        }),

        '& ul': {
            display: 'flex',
            justifyContent: 'center',
        },

        '& p': {
            padding: theme.rem(1),
        },

        '& li button': {
            display: 'none',
            padding: theme.rem(1),
            color: 'inherit',
            font: 'inherit',
        },

        '& li.slick-active button': {
            display: 'block',
        },
    },
    mobileDots: {
        bottom: theme.rem(6),
    },
}));

interface IProps {
    images: string[];
}

const toMatch = /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i;

const FullPageGallery = ({ images }: IProps): ReactElement => {
    const css = useStyles();
    const ref = useRef<Slider>(null);
    const isMobile = toMatch.test(window.navigator.userAgent || '');

    useEffect(() => {
        if (ref.current) {
            const key: { [key: string]: () => void } = {
                ArrowRight: ref.current.slickNext,
                ArrowUp: ref.current.slickNext,
                Enter: ref.current.slickNext,
                Tab: ref.current.slickNext,
                Space: ref.current.slickNext,
                ArrowLeft: ref.current.slickPrev,
                ArrowDown: ref.current.slickPrev,
            };

            const handler = (event: KeyboardEvent): void => {
                event.preventDefault();
                key[event.code] && key[event.code]();
            };

            window.addEventListener('keydown', handler);
            return () => {
                window.removeEventListener('keydown', handler);
            };
        }
    }, [ref]);

    return (
        <FullPageModal>
            <Slider
                dots
                infinite
                ref={ref}
                draggable
                slidesToShow={1}
                initialSlide={0}
                slidesToScroll={1}
                className={clsx(css.wrp, isMobile && css.mobile)}
                dotsClass={clsx(css.dots, isMobile && css.mobileDots)}
                accessibility={false}
                lazyLoad="progressive"
                appendDots={dots => (
                    <div>
                        <ul>{dots}</ul>
                        <span>/</span>
                        <p>{images.length}</p>
                    </div>
                )}
            >
                {images.map(item => (
                    <div className={css.slide} key={item}>
                        <img className={css.img} draggable={false} src={item} aria-hidden="true" alt="" />
                    </div>
                ))}
            </Slider>
        </FullPageModal>
    );
};

export default FullPageGallery;
