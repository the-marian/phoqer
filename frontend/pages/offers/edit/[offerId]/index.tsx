import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';

import { serverRedirect } from '../../../../assets/helpers';
import routes from '../../../../assets/routes';
import { Theme } from '../../../../assets/theme';
import Breadcrumbs from '../../../../components/Common/Breadcrumbs';
import Container from '../../../../components/Common/Container';
import Gift from '../../../../components/Common/Gift';
import { modal } from '../../../../components/Common/Modal';
import FullPageModal from '../../../../components/Common/Modal/FullPageModal';
import EditContentForm from '../../../../components/Pages/Offers/Edit/EditContentForm';
import AsideElement from '../../../../components/Pages/SingleOffer/AsideElement';
import OfferSlider from '../../../../components/Pages/SingleOffer/Slider';
import Meta from '../../../../components/Shared/Meta';
import PageLayout from '../../../../components/Shared/PageLayout';
import useAuth from '../../../../hooks/auth.hook';
import { IOfferCard, IState, IStore } from '../../../../interfaces';
import { wrapper } from '../../../../redux/store';
import types from '../../../../redux/types';

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

        ...theme.media(768).max({
            flexDirection: 'column',
            marginTop: theme.rem(2),
            fontSize: theme.rem(1.6),
        }),
    },
    main: {
        width: 'calc(100% - 45rem)',
        paddingRight: theme.rem(3),
        color: theme.palette.black[0],

        ...theme.media(768).max({
            width: '100%',
            marginBottom: theme.rem(6),
            paddingRight: '0',
        }),
    },
}));

const SingleOfferPage = (): ReactElement | null => {
    const css = useStyles();
    const auth = useAuth();
    const history = useRouter();
    const dispatch = useDispatch();

    const offer = useSelector<IState, IOfferCard | null>(state => state.offers.single);

    useEffect(() => {
        if (offer?.author_id && auth?.id) {
            if (offer?.author_id !== auth?.id) {
                history.push(routes.root);
                return;
            }
            dispatch({ type: types.GET_PUBLIC_PROFILE_START, payload: offer.author_id });
        }
    }, [offer, auth]);

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
            <PageLayout>
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
                            <EditContentForm />
                            <Gift />
                        </div>

                        <AsideElement />
                    </div>
                </Container>
            </PageLayout>
        </>
    ) : null;
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async ctx => {
    if (serverRedirect((ctx as unknown) as GetServerSidePropsContext)) return;

    ctx?.store?.dispatch({ type: types.GET_CATEGORIES_START });
    ctx.store.dispatch({ type: types.GET_SINGLE_OFFER_START, payload: ctx.query?.offerId });
    ctx.store.dispatch(END);
    await (ctx.store as IStore)?.sagaTask?.toPromise();
});

export default SingleOfferPage;
