import React, { useEffect } from 'react';

import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import useAuth from '../../../../../hooks/auth.hook';
import useMedia from '../../../../../hooks/media.hook';
import useTrans from '../../../../../hooks/trans.hook';
import { IOfferCard, IState } from '../../../../../interfaces';
import types from '../../../../../redux/types';
import routes from '../../../../../utils/routes';
import { Theme } from '../../../../../utils/theming/theme';
import Gift from '../../../../common/advertising/gift';
import Breadcrumbs from '../../../../common/breadcrumbs';
import Comments from '../../../../common/comments';
import ErrorComponent from '../../../../common/error-template';
import GoogleMap from '../../../../common/google-map';
import { modal } from '../../../../common/modal';
import FullPageModal from '../../../../common/modal/full-page-modal';
import Meta from '../../../../meta';
import AsideElement from '../aside-element';
import OfferFunctions from '../offer-functions';
import OfferHead from '../offer-head';
import Price from '../price';
import RelatedOffers from '../related-offers';
import Requirements from '../requirements';
import OfferSlider from '../slider';

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

        ...theme.media(768).max({
            fontSize: theme.rem(1.4),
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
            fontSize: theme.rem(1.6),
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
    title: {
        margin: theme.rem(0, 0, 1),
        fontSize: theme.rem(3),
        fontWeight: theme.text.weight[3],
        lineHeight: 1.4,
        color: theme.palette.black[0],

        ...theme.media(768).max({
            fontSize: theme.rem(2.5),
        }),
    },
    other: {
        marginBottom: theme.rem(4),
    },
}));

const SingleOfferContent = (): JSX.Element => {
    const css = useStyles();
    const trans = useTrans();
    const dispatch = useDispatch();

    const { token } = useAuth();
    const media = useMedia(768);
    const history = useRouter();
    const offerId = +String(history.query?.offerId || 1);

    const offer = useSelector<IState, IOfferCard | null>(state => state.offers.single);

    useEffect(() => {
        dispatch({ type: types.GET_POPULAR_OFFERS_START });
    }, [dispatch, offerId]);

    useEffect(() => {
        if (offer?.author_id) dispatch({ type: types.GET_PUBLIC_PROFILE_START, payload: offer.author_id });
    }, [offer, dispatch, history.locale, offerId]);

    const desc = offer?.description ? offer.description.replace(/\n/g, '<br>') : '';
    const other = offer?.extra_requirements ? offer.extra_requirements.replace(/\n/g, '<br>') : '';

    const handleModal = (): void => {
        modal.open(
            <FullPageModal>
                <img className={css.modal} draggable={false} src={offer?.cover_image || '/icons/no_img.png'} alt="" />
            </FullPageModal>,
        );
    };

    return (
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
                            src={offer?.cover_image || '/icons/no_img.png'}
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
                                label: trans(offer.category || offer.sub_category || 'search_for_things'),
                                link:
                                    offer?.category || offer?.sub_category
                                        ? routes.offers.single(
                                              offer?.category ? `?category=${offer?.category}` : `?sub=${offer?.sub_category}`,
                                          )
                                        : routes.offers.list,
                            },
                        ]}
                    />

                    <OfferFunctions />

                    <div className={css.flex}>
                        <div className={css.main}>
                            <h2 className={css.title}>{offer?.title}</h2>
                            <OfferHead offer={offer} />

                            {!media && <Price offer={offer} withButton />}
                            <h2 className={css.subtitle}>{trans('description')}</h2>
                            <p dangerouslySetInnerHTML={{ __html: desc }} />

                            <h2 className={css.subtitle}>{trans('requirements')}</h2>
                            <Requirements offer={offer} />

                            {other && (
                                <>
                                    <h2 className={css.subtitle}>{trans('additionally')}</h2>
                                    <p className={css.other} dangerouslySetInnerHTML={{ __html: other }} />
                                </>
                            )}

                            {offer.city && <GoogleMap city={offer.city} />}

                            {/*<h2 className={css.subtitle}>{trans('availability')}</h2>*/}
                            {/*<DayPicker*/}
                            {/*    className={css.calendar}*/}
                            {/*    fromMonth={new Date()}*/}
                            {/*    pagedNavigation*/}
                            {/*    fixedWeeks*/}
                            {/*    numberOfMonths={media ? 2 : 1}*/}
                            {/*/>*/}

                            {token?.access_token ? <Gift style={{ padding: '8rem 4rem' }} /> : null}

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
    );
};

export default SingleOfferContent;
