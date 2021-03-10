import React, { ReactElement, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import Slider from 'react-slick';

import { Theme } from '../../../../assets/theme';
import FullPageModal from '../FullPageModal';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        width: '100%',
        height: '100%',
        cursor: 'grab',

        '& .slick-track': {
            display: 'flex',
            alignItems: 'center',
        },
        '& .slick-list': {
            overflow: 'hidden',
        },
        '& .slick-arrow': {
            position: 'absolute',
            top: 0,
            height: '100%',
            width: theme.rem(4),
            fontSize: 0,
            transition: theme.transitions[0],

            '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '60%',
                zIndex: 2,
                transform: 'translateY(-50%) rotate(-45deg)',
                height: theme.rem(1.5),
                width: theme.rem(1.5),
            },
        },

        '& .slick-arrow.slick-prev': {
            left: 0,
            borderRadius: `${theme.radius} 0 0 ${theme.radius}`,

            '&::before': {
                borderTop: theme.border(0.2, theme.palette.gray[3]),
                borderLeft: theme.border(0.2, theme.palette.gray[3]),
                transition: theme.transitions[0],
            },
        },
        '& .slick-arrow.slick-next': {
            right: 0,
            borderRadius: `0 ${theme.radius} ${theme.radius} 0`,

            '&::before': {
                left: '25%',
                borderBottom: theme.border(0.2, theme.palette.gray[3]),
                borderRight: theme.border(0.2, theme.palette.gray[3]),
                transition: theme.transitions[0],
            },
        },
    },
    slide: {
        width: '100%',
        height: '100%',
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        objectPosition: 'center',
    },
}));

interface IProps {
    images: string[];
}

const FullPageGallery = ({ images }: IProps): ReactElement => {
    const css = useStyles();
    const ref = useRef<Slider>(null);

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
                ref={ref}
                slidesToShow={1}
                className={css.wrp}
                slidesToScroll={1}
                initialSlide={0}
                accessibility={false}
                draggable
                infinite
                lazyLoad="progressive"
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
