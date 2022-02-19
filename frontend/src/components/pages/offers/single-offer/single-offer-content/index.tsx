import React, { useEffect } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import useAuth from '../../../../../hooks/auth.hook';
import useMedia from '../../../../../hooks/media.hook';
import useTrans from '../../../../../hooks/trans.hook';
import { IOfferCard } from '../../../../../interfaces';
import types from '../../../../../redux/types';
import routes from '../../../../../utils/routes';
import { Theme } from '../../../../../utils/theming/theme';
import Gift from '../../../../common/advertising/gift';
import Breadcrumbs from '../../../../common/breadcrumbs';
import Comments from '../../../../common/comments';
import ErrorComponent from '../../../../common/error-template';
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

const RecentOffers = dynamic(() => import('../../../../common/offers/recent-offers'), { ssr: false });

const useStyles = createUseStyles((theme: Theme) => ({
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

interface IProps {
    data: IOfferCard | null;
}

const SingleOfferContent = ({ data }: IProps): JSX.Element => {
    const css = useStyles();
    const trans = useTrans();
    const dispatch = useDispatch();

    const { token } = useAuth();
    const media = useMedia(768);
    const history = useRouter();
    const offerId = String(history.query?.offerId);

    useEffect(() => {
        dispatch({ type: types.GET_POPULAR_OFFERS_START });
    }, [dispatch, offerId]);

    useEffect(() => {
        dispatch({ type: types.GET_COMMENTS_START, payload: offerId });
    }, [dispatch, offerId]);

    useEffect(() => {
        if (data?.author_id) dispatch({ type: types.GET_PUBLIC_PROFILE_START, payload: data?.author_id });
    }, [data, dispatch, history.locale, offerId]);

    const desc = data?.description ? data.description.replace(/\n/g, '<br>') : '';
    const other = data?.extra_requirements ? data.extra_requirements.replace(/\n/g, '<br>') : '';

    const handleModal = (): void => {
        modal.open(
            <FullPageModal>
                <img className={css.modal} draggable={false} src={data?.cover_image || '/icons/no_img.png'} alt="" />
            </FullPageModal>,
        );
    };

    if (history.isFallback) return <p>Loading...</p>;

    return (
        <>
            {data ? (
                <>
                    <Meta
                        title={data?.title}
                        h1={data?.title + data?.description.slice(0, 60)}
                        description={data?.description.slice(0, 150)}
                        icon={data?.cover_image}
                    />
                    {data.images && data.images.length > 1 ? (
                        <OfferSlider images={data?.images} />
                    ) : (
                        <img
                            className={css.banner}
                            src={data?.cover_image || '/icons/no_img.png'}
                            onClick={handleModal}
                            aria-hidden="true"
                            alt=""
                        />
                    )}
                    <Breadcrumbs
                        end={data?.title}
                        data={[
                            { label: trans('to_home_page'), link: routes.root },
                            {
                                label: trans(data.category || data.sub_category || 'search_for_things'),
                                link:
                                    data?.category || data?.sub_category
                                        ? routes.offers.single(
                                              data?.category ? `?category=${data?.category}` : `?sub=${data?.sub_category}`,
                                          )
                                        : routes.offers.list,
                            },
                        ]}
                    />

                    <OfferFunctions />

                    <div className={css.flex}>
                        <div className={css.main}>
                            <h2 className={css.title}>{data?.title}</h2>
                            <OfferHead offer={data} />

                            {!media && <Price offer={data} withButton />}
                            <h2 className={css.subtitle}>{trans('description')}</h2>
                            <p dangerouslySetInnerHTML={{ __html: desc }} />

                            <h2 className={css.subtitle}>{trans('requirements')}</h2>
                            <Requirements offer={data} />

                            {other && (
                                <>
                                    <h2 className={css.subtitle}>{trans('additionally')}</h2>
                                    <p className={css.other} dangerouslySetInnerHTML={{ __html: other }} />
                                </>
                            )}

                            {token?.access_token ? <Gift style={{ padding: '8rem 4rem' }} /> : null}

                            <Comments />
                        </div>

                        <AsideElement data={data} />
                    </div>

                    <RecentOffers />

                    <RelatedOffers />
                </>
            ) : (
                <ErrorComponent title="404" text={trans('404_offer')} />
            )}
        </>
    );
};

export default SingleOfferContent;
