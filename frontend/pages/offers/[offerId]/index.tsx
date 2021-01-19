import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faEye, faHeart as faFillHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import { declOfNum, findCategory, findSubCategory, moneyFormat } from '../../../assets/helpers';
import routes from '../../../assets/routes';
import { Theme } from '../../../assets/theme';
import Breadcrumbs from '../../../components/Common/Breadcrumbs';
import Meta from '../../../components/Common/Meta';
import { modal } from '../../../components/Common/Modal';
import FullPageModal from '../../../components/Common/Modal/FullPageModal';
import ProfileCard from '../../../components/Common/ProfileCard';
import Container from '../../../components/Layout/Container';
import Main from '../../../components/Layout/Main';
import OfferSlider from '../../../components/Pages/Offers/Slider';
import { ICategories, IOfferCard, IState, IStore } from '../../../interfaces';
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
        fontSize: theme.rem(1.3),
    },
    main: {
        width: 'calc(100% - 40rem)',
        paddingRight: theme.rem(10),
    },
    title: {
        margin: theme.rem(0, 0, 1),
        fontSize: theme.rem(4),
        fontWeight: theme.text.weight[3],
        lineHeight: 1,
    },
    action: {
        display: 'flex',
        alignItems: 'center',
    },
    favorite: {
        margin: theme.rem(0, 2),
        padding: theme.rem(1, 1.5),
        color: theme.palette.primary[0],
        borderRadius: theme.radius,

        '&:hover': {
            background: theme.palette.gray[1],
        },
        '& svg': {
            height: theme.rem(1.4),
            width: theme.rem(1.4),
            fill: theme.palette.primary[0],
        },
    },
    eye: {
        margin: theme.rem(0, 0, 0, 6),
        '& span': {
            margin: theme.rem(0, 1),
        },
        '& svg': {
            height: theme.rem(1.4),
            width: theme.rem(1.4),
        },
    },
    subtitle: {
        margin: theme.rem(6, 0, 3),
        fontSize: theme.rem(2),
        fontWeight: theme.text.weight[3],
    },
    req: {
        '& li': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: theme.rem(2, 0),
        },
    },
    dots: {
        flexGrow: 2,
        margin: theme.rem(0, 2),
        borderBottom: '0.1rem dashed #aaa',
    },
    emoji: {
        '& li': {
            display: 'flex',
            alignItems: 'center',
            margin: theme.rem(2, 0),
        },
        '& img': {
            height: theme.rem(3),
            width: theme.rem(3),
            marginRight: theme.rem(2),
        },
    },
    gray: {
        filter: 'grayscale(100%)',
        color: theme.palette.gray[2],
    },

    // right
    aside: {
        position: 'relative',
        width: theme.rem(40),
        marginTop: theme.rem(1),
    },
    sticky: {
        position: 'sticky',
        top: theme.rem(10),
        left: 0,
    },
}));

const SingleOfferPage = (): ReactElement => {
    const css = useStyles();

    const offer = useSelector<IState, IOfferCard>(state => state.offers.single);
    const categories = useSelector<IState, ICategories[]>(state => state.categories);

    const catName = offer?.category
        ? findCategory(categories, offer.category)
        : offer?.sub_category
        ? findSubCategory(categories, offer.sub_category)
        : null;

    const desc = offer?.description ? offer.description.replace(/\n/g, '<br>') : '';
    const other = offer?.extra_requirements ? offer.extra_requirements.replace(/\n/g, '<br>') : '';

    const handleModal = (): void => {
        modal.open(
            <FullPageModal>
                <img className={css.modal} draggable={false} src={offer.cover_image} alt="" />
            </FullPageModal>,
        );
    };

    return offer ? (
        <>
            <Meta />
            <Main>
                <Container>
                    {offer.images.length > 1 ? (
                        <OfferSlider images={offer.images} />
                    ) : offer.images.length || offer.cover_image ? (
                        <img className={css.banner} src={offer.cover_image} alt="" onClick={handleModal} aria-hidden />
                    ) : null}
                    <Breadcrumbs
                        end={offer.title}
                        data={[
                            { label: 'На главную страницу', link: routes.root },
                            {
                                label: catName ? `Предложения в раздере ${catName}` : 'Поиск вещей / услуг',
                                link: catName
                                    ? routes.offers.single(
                                          offer.category ? `?category=${offer.category}` : `?sub=${offer.sub_category}`,
                                      )
                                    : routes.offers.list,
                            },
                        ]}
                    />

                    <div className={css.flex}>
                        <div className={css.main}>
                            <h1 className={css.title}>{offer.title}</h1>
                            <div className={css.action}>
                                <p>Опубликовано: {offer.pub_date}</p>
                                <p className={css.eye}>
                                    <FontAwesomeIcon icon={faEye} />
                                    <span>{offer.views}</span>
                                </p>
                                <button className={css.favorite} type="button">
                                    {offer.is_favorite ? (
                                        <FontAwesomeIcon icon={faFillHeart} />
                                    ) : (
                                        <FontAwesomeIcon icon={faHeart} />
                                    )}
                                </button>
                            </div>

                            <h2 className={css.subtitle}>Описание</h2>
                            <p dangerouslySetInnerHTML={{ __html: desc }} />

                            <h2 className={css.subtitle}>Требования</h2>
                            <ul className={css.req}>
                                <li>
                                    <span>Залоговая сумма:</span>
                                    <span className={css.dots} />
                                    <span>{offer.deposit_val ? `${moneyFormat(offer.deposit_val)}.00 грн` : 'Не указанно'}</span>
                                </li>
                                <li>
                                    <span>Минимальный срок аренды:</span>
                                    <span className={css.dots} />
                                    <span>
                                        {offer.min_rent_period
                                            ? `${moneyFormat(offer.min_rent_period)} ${declOfNum(offer.min_rent_period, [
                                                  'день',
                                                  'дня',
                                                  'дней',
                                              ])}`
                                            : 'Не указанно'}
                                    </span>
                                </li>
                                <li>
                                    <span>Максимальный срок аренды:</span>
                                    <span className={css.dots} />
                                    <span>
                                        {offer.max_rent_period
                                            ? `${moneyFormat(offer.max_rent_period)} ${declOfNum(offer.max_rent_period, [
                                                  'день',
                                                  'дня',
                                                  'дней',
                                              ])}`
                                            : 'Не указанно'}
                                    </span>
                                </li>
                            </ul>
                            <ul className={css.emoji}>
                                <li className={offer.is_deliverable ? null : css.gray}>
                                    <img src="/emoji/delivery.png" alt="" />
                                    <span>
                                        {offer.is_deliverable
                                            ? 'Владелец осуществит доставку товара'
                                            : 'Владелец НЕ осуществляет доставку товара'}
                                    </span>
                                </li>
                                <li className={offer.doc_needed ? null : css.gray}>
                                    <img src="/emoji/documents.png" alt="" />
                                    <span>
                                        {offer.doc_needed
                                            ? 'Необходимо предоставить документы в качестве залога'
                                            : 'НЕ нужно оставлять документы в качестве залога'}
                                    </span>
                                </li>
                            </ul>

                            {other && (
                                <>
                                    <h2 className={css.subtitle}>Дополнительно</h2>
                                    <p dangerouslySetInnerHTML={{ __html: other }} />
                                </>
                            )}
                        </div>

                        <aside className={css.aside}>
                            <div className={css.sticky}>
                                <ProfileCard firstName="Влад" lastName="Василенко" />

                                <h3>Цена:</h3>
                                <p>150 грн / день</p>
                                <button type="button">Арендовать</button>
                            </div>
                        </aside>
                    </div>
                </Container>
            </Main>
        </>
    ) : null;
};

export const getServerSideProps = wrapper.getServerSideProps(
    async ({ store, ...ctx }: GetServerSidePropsContext & { store: IStore }): Promise<void> => {
        if (!ctx.query?.offerId) return null;

        store.dispatch({ type: types.GET_CATEGORIES_START });
        store.dispatch({ type: types.GET_SINGLE_OFFER_START, payload: ctx.query?.offerId });
        store.dispatch(END);
        await store.sagaTask.toPromise();
    },
);

export default SingleOfferPage;
