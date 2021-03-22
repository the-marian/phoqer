import { GetServerSideProps } from 'next';
import React, { ReactElement, useEffect } from 'react';
import DayPicker from 'react-day-picker';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';

import routes from '../../../assets/routes';
import { Theme } from '../../../assets/theme';
import Breadcrumbs from '../../../components/Common/Breadcrumbs';
import Comments from '../../../components/Common/Comments';
import Meta from '../../../components/Common/Meta';
import { modal } from '../../../components/Common/Modal';
import FullPageModal from '../../../components/Common/Modal/FullPageModal';
import Container from '../../../components/Layout/Container';
import Main from '../../../components/Layout/TagMain';
import AsideElement from '../../../components/Pages/SingleOffer/AsideElement';
import OfferHead from '../../../components/Pages/SingleOffer/OfferHead';
import Price from '../../../components/Pages/SingleOffer/Price';
import RelatedOffers from '../../../components/Pages/SingleOffer/RelatedOffers';
import Requirements from '../../../components/Pages/SingleOffer/Requirements';
import OfferSlider from '../../../components/Pages/SingleOffer/Slider';
import SmallBanner from '../../../components/Pages/SingleOffer/SmallBanner';
import useMedia from '../../../hooks/media.hook';
import { IOfferCard, IState, IStore } from '../../../interfaces';
import { wrapper } from '../../../redux/store';
import types from '../../../redux/types';

const useStyles = createUseStyles((theme: Theme) => ({
    // top content
    banner: {
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
    modal: {
        display: 'block',
        width: '100vw',
        height: '100vh',
        objectFit: 'contain',
    },

    // main
    flex: {
        display: 'flex',
        marginTop: theme.rem(6),
        fontSize: theme.rem(1.6),

        '@media (max-width: 768px)': {
            flexDirection: 'column',
            marginTop: theme.rem(2),
            fontSize: theme.rem(1.6),
        },
    },
    main: {
        width: 'calc(100% - 40rem)',
        marginRight: theme.rem(10),
        color: theme.palette.black[0],

        '@media (max-width: 1300px)': {
            marginRight: theme.rem(4),
        },

        '@media (max-width: 768px)': {
            width: '100%',
            marginBottom: theme.rem(6),
            marginRight: 0,
        },
    },
    subtitle: {
        margin: theme.rem(6, 0, 3),
        fontSize: theme.rem(2),
        fontWeight: theme.text.weight[3],

        '@media (max-width: 768px)': {
            margin: theme.rem(3, 0, 1),
            fontSize: theme.rem(2.5),
        },
    },
    calendar: {
        width: '100%',
        fontSize: theme.rem(1.8),

        '@media (max-width: 1210px)': {
            fontSize: theme.rem(1.5),
        },

        '@media (max-width: 1100px)': {
            width: '100%',
            fontSize: theme.rem(1.8),
        },

        '& .DayPicker-wrapper': {
            outline: 'none',
        },

        '& .DayPicker-Months': {
            display: 'flex',
            justifyContent: 'space-between',
        },

        '& .DayPicker-Month': {
            width: '49%',
            margin: theme.rem(2, 0, 0, -1),

            '@media (max-width: 1100px)': {
                width: '100%',
                margin: theme.rem(2, 0, 0, -1),
            },
        },

        '& .DayPicker-NavButton': {
            top: theme.rem(-0.3),
            right: theme.em(0.7),
            width: theme.rem(6.5),
            height: theme.rem(5),
            backgroundColor: theme.palette.gray[1],
            backgroundSize: '15%',
            backgroundPosition: 'center',
            borderRadius: theme.radius,

            '&.DayPicker-NavButton--prev': {
                marginRight: theme.rem(7.5),
            },

            '@media (max-width: 1100px)': {
                right: theme.em(0.5),
            },
        },
    },
}));

const SingleOfferPage = (): ReactElement | null => {
    const css = useStyles();
    const dispatch = useDispatch();
    const priceMedia = useMedia(768);
    const calendarMedia = useMedia(1100);

    const offer = useSelector<IState, IOfferCard | null>(state => state.offers.single);

    useEffect(() => {
        if (offer?.author_id) dispatch({ type: types.GET_PUBLIC_PROFILE_START, payload: offer.author_id });
    }, [offer]);

    const desc = offer?.description ? offer.description.replace(/\n/g, '<br>') : '';
    const other = offer?.extra_requirements ? offer.extra_requirements.replace(/\n/g, '<br>') : '';

    const handleModal = (): void => {
        modal.open(
            <FullPageModal>
                <img className={css.modal} draggable={false} src={offer?.cover_image || '/no_img.png'} alt="" />
            </FullPageModal>,
        );
    };

    return offer ? (
        <>
            <Meta
                title={offer?.title}
                h1={offer?.title + offer?.description.slice(0, 60)}
                description={offer?.description.slice(0, 150)}
                icon={offer?.cover_image}
            />
            <Main>
                <Container>
                    {offer.images && offer.images.length > 1 ? (
                        <OfferSlider images={offer?.images} />
                    ) : (
                        <img
                            className={css.banner}
                            src={offer?.cover_image || '/no_img.png'}
                            alt=""
                            onClick={handleModal}
                            aria-hidden="true"
                        />
                    )}
                    <Breadcrumbs
                        end={offer?.title}
                        data={[
                            { label: 'На главную страницу', link: routes.root },
                            {
                                label:
                                    offer.category_name || offer.sub_category_name
                                        ? `Предложения в разделе ${offer.category_name || offer.sub_category_name}`
                                        : 'Поиск вещей / услуг',
                                link: offer.category
                                    ? routes.offers.single(
                                          offer?.category ? `?category=${offer?.category}` : `?sub=${offer?.sub_category}`,
                                      )
                                    : routes.offers.list,
                            },
                        ]}
                    />

                    <div className={css.flex}>
                        <div className={css.main}>
                            <OfferHead />

                            {!priceMedia && <Price />}
                            <h2 className={css.subtitle}>Описание</h2>
                            <p dangerouslySetInnerHTML={{ __html: desc }} />

                            <h2 className={css.subtitle}>Требования</h2>
                            <Requirements />

                            {other && (
                                <>
                                    <h2 className={css.subtitle}>Дополнительно</h2>
                                    <p dangerouslySetInnerHTML={{ __html: other }} />
                                </>
                            )}

                            <h2 className={css.subtitle}>Наличие</h2>
                            <DayPicker
                                className={css.calendar}
                                fromMonth={new Date()}
                                pagedNavigation
                                fixedWeeks
                                numberOfMonths={calendarMedia ? 2 : 1}
                            />

                            <SmallBanner />

                            <Comments />
                        </div>

                        <AsideElement />
                    </div>

                    <RelatedOffers />
                </Container>
            </Main>
        </>
    ) : null;
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async ctx => {
    if (!ctx.query?.offerId) return;

    ctx.store.dispatch({ type: types.GET_POPULAR_OFFERS_START });
    ctx.store.dispatch({ type: types.GET_COMMENTS_START, payload: ctx.query?.offerId });
    ctx.store.dispatch({ type: types.GET_SINGLE_OFFER_START, payload: ctx.query?.offerId });
    ctx.store.dispatch(END);
    await (ctx.store as IStore)?.sagaTask?.toPromise();
});

export default SingleOfferPage;
