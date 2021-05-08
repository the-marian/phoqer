import { GetServerSideProps } from 'next';
import React, { ReactElement, useEffect } from 'react';
import DayPicker from 'react-day-picker';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';

import routes from '../../../assets/routes';
import { Theme } from '../../../assets/theme';
import Breadcrumbs from '../../../components/common/breadcrumbs';
import Comments from '../../../components/common/comments';
import ErrorComponent from '../../../components/common/error';
import Gift from '../../../components/common/gift';
import { modal } from '../../../components/common/modal';
import FullPageModal from '../../../components/common/modal/full-page-modal';
import Container from '../../../components/layout/container';
import Meta from '../../../components/layout/meta';
import PageLayout from '../../../components/layout/page-layout';
import AsideElement from '../../../components/pages/single-offer/aside-element';
import OfferHead from '../../../components/pages/single-offer/offer-head';
import Price from '../../../components/pages/single-offer/price';
import RelatedOffers from '../../../components/pages/single-offer/related-offers';
import Requirements from '../../../components/pages/single-offer/requirements';
import OfferSlider from '../../../components/pages/single-offer/slider';
import useAuth from '../../../hooks/auth.hook';
import useMedia from '../../../hooks/media.hook';
import useTrans from '../../../hooks/trans.hook';
import { IOfferCard, IState, IStore } from '../../../interfaces';
import { wrapper } from '../../../redux/store';
import types from '../../../redux/types';

const useStyles = createUseStyles((theme: Theme) => ({
    // top translate
    banner: {
        display: 'block',
        height: theme.rem(60),
        borderRadius: theme.radius,
        objectFit: 'contain',
        background: theme.palette.gray[1],
        cursor: 'zoom-in',

        ...theme.media(768).max({
            height: theme.rem(30),
        }),
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

        ...theme.media(1100).max({
            flexDirection: 'column',
            marginTop: theme.rem(2),
        }),
    },
    main: {
        width: 'calc(100% - 45rem)',
        paddingRight: theme.rem(3),
        color: theme.palette.black[0],

        ...theme.media(1100).max({
            width: '100%',
            marginBottom: theme.rem(6),
            paddingRight: '0',
        }),
    },
    subtitle: {
        margin: theme.rem(6, 0, 3),
        fontSize: theme.rem(2),
        fontWeight: theme.text.weight[3],

        ...theme.media(768).max({
            margin: theme.rem(3, 0, 1),
        }),
    },
    calendar: {
        width: '100%',
        fontSize: theme.rem(1.8),

        ...theme.media(1210).max({
            fontSize: theme.rem(1.5),
        }),
        ...theme.media(768).max({
            width: '100%',
        }),

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

            ...theme.media(768).max({
                width: '100%',
                margin: theme.rem(2, 0, 0, -1),
            }),
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

            ...theme.media(768).max({
                right: theme.em(0.5),
            }),
        },
    },
}));

const SingleOfferPage = (): ReactElement | null => {
    const css = useStyles();
    const auth = useAuth();
    const trans = useTrans();
    const dispatch = useDispatch();
    const media = useMedia(768);

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

    return (
        <PageLayout>
            <Container>
                <>
                    {offer ? (
                        <>
                            <Meta
                                title={offer?.title}
                                h1={offer?.title + offer?.description.slice(0, 60)}
                                description={offer?.description.slice(0, 150)}
                                icon={offer?.cover_image}
                            />
                            {offer.images && offer.images.length > 1 ? (
                                <OfferSlider images={offer?.images} />
                            ) : (
                                <img
                                    className={css.banner}
                                    src={offer?.cover_image || '/no_img.png'}
                                    onClick={handleModal}
                                    aria-hidden="true"
                                    alt=""
                                />
                            )}
                            <Breadcrumbs
                                end={offer?.title}
                                data={[
                                    { label: trans('to_home_page'), link: routes.root },
                                    {
                                        label: trans(offer.category || offer.sub_category || '...')
                                            ? `${trans('offers_in_section')} ${trans(
                                                  offer.category || offer.sub_category || '...',
                                              )}`
                                            : trans('search_for_things'),
                                        link: offer.category
                                            ? routes.offers.single(
                                                  offer?.category
                                                      ? `?category=${offer?.category}`
                                                      : `?sub=${offer?.sub_category}`,
                                              )
                                            : routes.offers.list,
                                    },
                                ]}
                            />

                            <div className={css.flex}>
                                <div className={css.main}>
                                    <OfferHead />

                                    {!media && <Price />}
                                    <h2 className={css.subtitle}>{trans('description')}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: desc }} />

                                    <h2 className={css.subtitle}>{trans('requirements')}</h2>
                                    <Requirements />

                                    {other && (
                                        <>
                                            <h2 className={css.subtitle}>{trans('additionally')}</h2>
                                            <p dangerouslySetInnerHTML={{ __html: other }} />
                                        </>
                                    )}

                                    <h2 className={css.subtitle}>{trans('availability')}</h2>
                                    <DayPicker
                                        className={css.calendar}
                                        fromMonth={new Date()}
                                        pagedNavigation
                                        fixedWeeks
                                        numberOfMonths={media ? 2 : 1}
                                    />

                                    {auth?.access_token ? <Gift style={{ padding: '8rem 4rem' }} /> : null}

                                    <Comments />
                                </div>

                                <AsideElement />
                            </div>

                            <RelatedOffers />
                        </>
                    ) : (
                        <ErrorComponent title="404" text={trans('404_offer')} />
                    )}
                </>
            </Container>
        </PageLayout>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async ctx => {
    ctx.store.dispatch({ type: types.GET_POPULAR_OFFERS_START });
    ctx.store.dispatch({ type: types.GET_COMMENTS_START, payload: ctx.query?.offerId });
    ctx.store.dispatch({ type: types.GET_SINGLE_OFFER_START, payload: ctx.query?.offerId });
    ctx.store.dispatch(END);
    await (ctx.store as IStore)?.sagaTask?.toPromise();
});

export default SingleOfferPage;
