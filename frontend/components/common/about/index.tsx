import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import Slider from 'react-slick';

import template from '../../../assets/template';
import { Theme } from '../../../assets/theme';
import useTrans from '../../../hooks/trans.hook';

interface ISlides {
    src: string;
    src640: string;
    src1280: string;
    src1920: string;
}
const slides: ISlides[] = [
    {
        src: '/about/camera.jpeg',
        src640: '/about/camera640.jpeg',
        src1280: '/about/camera1280.jpeg',
        src1920: '/about/camera1920.jpeg',
    },
    {
        src: '/about/bicycle.jpeg',
        src640: '/about/bicycle640.jpeg',
        src1280: '/about/bicycle1280.jpeg',
        src1920: '/about/bicycle1920.jpeg',
    },
    {
        src: '/about/drone.jpeg',
        src640: '/about/drone640.jpeg',
        src1280: '/about/drone1280.jpeg',
        src1920: '/about/drone1920.jpeg',
    },
    {
        src: '/about/console.jpeg',
        src640: '/about/console640.jpeg',
        src1280: '/about/console1280.jpeg',
        src1920: '/about/console1920.jpeg',
    },
    {
        src: '/about/vr.jpeg',
        src640: '/about/vr640.jpeg',
        src1280: '/about/vr1280.jpeg',
        src1920: '/about/vr1920.jpeg',
    },
    {
        src: '/about/laptop.jpeg',
        src640: '/about/laptop640.jpeg',
        src1280: '/about/laptop1280.jpeg',
        src1920: '/about/laptop1920.jpeg',
    },
];

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        padding: theme.rem(20, 0),
        color: theme.palette.black[0],

        ...theme.media(500).max({
            padding: theme.rem(15, 0),
        }),
    },
    slider: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: theme.rem(70),

        ...theme.media(1200).max({
            height: theme.rem(55),
        }),
        ...theme.media(500).max({
            height: theme.rem(40),
        }),

        '& .slick-track': {
            display: 'flex',
        },

        '& .slick-list': {
            width: '100%',
            overflow: 'hidden',
        },

        '& .slick-arrow': {
            position: 'absolute',
            top: '50%',
            zIndex: 5,
            transform: 'translateY(-50%)',
            opacity: 1,
            ...template(theme).btn,
            fontSize: 0,
            background: theme.palette.gray[1],

            '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                transform: 'translate(-50%, -50%) rotate(45deg)',
                height: theme.rem(1),
                width: theme.rem(1),
            },

            ...theme.hover({
                opacity: '0.8',
            }),
        },

        '& .slick-next': {
            right: theme.rem(1),
            '&::before': {
                left: '45%',
                borderTop: theme.border(0.2, theme.palette.black[0]),
                borderRight: theme.border(0.2, theme.palette.black[0]),
            },
        },

        '& .slick-prev': {
            left: theme.rem(1),
            '&::before': {
                left: '55%',
                borderLeft: theme.border(0.2, theme.palette.black[0]),
                borderBottom: theme.border(0.2, theme.palette.black[0]),
            },
        },
    },
    img: {
        display: 'block',
        height: theme.rem(70),
        objectFit: 'cover',
        objectPosition: 'center',
        cursor: 'grab',

        ...theme.media(1200).max({
            height: theme.rem(55),
        }),
        ...theme.media(500).max({
            height: theme.rem(40),
        }),
    },
    title: {
        textTransform: 'uppercase',
        margin: theme.rem(4, 0, 2),
        textAlign: 'center',
        fontSize: theme.rem(2),
        fontWeight: theme.text.weight[3],
    },
    content: {
        width: '100%',
        maxWidth: theme.rem(60),
        margin: '0 auto',

        ...theme.media(500).max({
            maxWidth: '80%',
        }),
    },
    text: {
        margin: theme.rem(3, 0),
        fontSize: theme.rem(1.4),
        textAlign: 'center',

        ...theme.media(768).max({
            fontSize: theme.rem(1.6),
        }),
        ...theme.media(500).max({
            margin: theme.rem(2, 0),
        }),
    },
}));

const About = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();

    return (
        <div className={css.wrp}>
            <Slider
                slidesToShow={1}
                slidesToScroll={1}
                initialSlide={0}
                swipeToSlide
                autoplaySpeed={3000}
                autoplay
                draggable
                infinite
                lazyLoad="progressive"
                className={css.slider}
            >
                {slides.map(item => (
                    <picture key={item.src} className={css.img}>
                        <source media="(max-width: 640px)" srcSet={item.src640} />
                        <source media="(max-width: 1280px)" srcSet={item.src1280} />
                        <source media="(max-width: 1280px)" srcSet={item.src1280} />
                        <source media="(max-width: 1920px)" srcSet={item.src1920} />
                        <img className={css.img} src={item.src} alt="phoqer" />
                    </picture>
                ))}
            </Slider>

            <h2 className={css.title}>phoqer</h2>
            <div className={css.content}>
                <p className={css.text}>{trans('about_1')}</p>
                <p className={css.text}>{trans('about_2')}</p>
                <p className={css.text}>{trans('about_3')}</p>
            </div>
        </div>
    );
};

export default About;
