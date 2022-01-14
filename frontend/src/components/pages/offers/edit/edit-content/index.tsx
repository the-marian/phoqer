import React, { ReactElement, useEffect } from 'react';

import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import useTrans from '../../../../../hooks/trans.hook';
import { IOfferCard, IState } from '../../../../../interfaces';
import types from '../../../../../redux/types';
import routes from '../../../../../utils/routes';
import mixin from '../../../../../utils/theming/mixin';
import { Theme } from '../../../../../utils/theming/theme';
import Breadcrumbs from '../../../../common/breadcrumbs';
import ErrorComponent from '../../../../common/error-template';
import { modal } from '../../../../common/modal';
import Meta from '../../../../meta';
import AsideElement from '../aside-element';
import EditContentForm from '../edit-content-form';
import PhotosList from '../photos-list';
import PhotosUploadModal from '../photos-upload-modal';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        marginTop: theme.rem(6),
        fontSize: theme.rem(1.6),

        ...theme.media(940).max({
            flexDirection: 'column',
            marginTop: theme.rem(2),
        }),
    },
    main: {
        width: 'calc(100% - 45rem)',
        paddingRight: theme.rem(3),
        color: theme.palette.black[0],

        ...theme.media(1200).max({
            width: 'calc(100% - 40rem)',
        }),
        ...theme.media(940).max({
            width: '100%',
            marginBottom: theme.rem(6),
            paddingRight: '0',
        }),
    },
    plus: {
        ...mixin(theme).btn,
        margin: '2rem auto',

        '& span': {
            marginLeft: theme.rem(1),
        },
    },
}));

const SingleOfferContent = (): ReactElement | null => {
    const css = useStyles();
    const trans = useTrans();
    const dispatch = useDispatch();

    const history = useRouter();
    const offerId = history.query?.offerId;

    const offer = useSelector<IState, IOfferCard | null>(state => state.offers.single);

    useEffect(() => {
        dispatch({ type: types.GET_CATEGORIES_START });
    }, [dispatch]);

    useEffect(() => {
        dispatch({ type: types.GET_SINGLE_OFFER_START, payload: offerId });
    }, [dispatch, offerId]);

    useEffect(() => {
        if (offer?.country) dispatch({ type: types.SELECT_COUNTRY, payload: offer?.country });
        if (offer?.city) dispatch({ type: types.SELECT_CITY, payload: offer?.city });
    }, [offer?.city, offer?.country, dispatch, history.locale]);

    useEffect(() => {
        if (+(offer?.author_id || 0)) dispatch({ type: types.GET_PUBLIC_PROFILE_START, payload: offer?.author_id });
    }, [offer?.author_id, dispatch, history.locale]);

    const handleModal = (): void => {
        modal.open(<PhotosUploadModal />);
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

                    <PhotosList />

                    <button className={css.plus} type="button" onClick={handleModal}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Добавить фотографии</span>
                    </button>

                    <Breadcrumbs
                        end={offer?.title}
                        data={[
                            { label: 'На главную страницу', link: routes.root },
                            {
                                label:
                                    offer.category || offer.sub_category
                                        ? `Предложения в разделе ${trans(offer.category || offer.sub_category || '...')}`
                                        : 'Поиск вещей и услуг',
                                link:
                                    offer.category || offer?.sub_category
                                        ? routes.offers.single(
                                              offer?.category
                                                  ? `?category=${offer?.category}`
                                                  : `?sub_category=${offer?.sub_category}`,
                                          )
                                        : routes.offers.list,
                            },
                        ]}
                    />
                    <div className={css.flex}>
                        <div className={css.main}>
                            <EditContentForm />
                        </div>
                        <AsideElement />
                    </div>
                </>
            ) : (
                <ErrorComponent title="404" text={trans('404_offer')} />
            )}
        </>
    );
};

export default SingleOfferContent;
