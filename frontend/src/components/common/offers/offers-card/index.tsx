import React, { ReactElement } from 'react';

import { faEye } from '@fortawesome/free-regular-svg-icons/faEye';
import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart';
import { faCogs } from '@fortawesome/free-solid-svg-icons/faCogs';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons/faDotCircle';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faTruck } from '@fortawesome/free-solid-svg-icons/faTruck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import useAuth from '../../../../hooks/auth.hook';
import useConfig from '../../../../hooks/config.hook';
import useTrans from '../../../../hooks/trans.hook';
import { IDropList, IDropValue, IOfferCard } from '../../../../interfaces';
import types from '../../../../redux/types';
import { cutString, moneyFormat } from '../../../../utils/helpers';
import routes from '../../../../utils/routes';
import LoginForm from '../../auth-form/login-form';
import DropDown from '../../drop-down';
import { modal } from '../../modal';
import SmallModalWrp from '../../modal/small-modal-wrp';
import notifications from '../../notifications';
import Tooltip from '../../tooltip';

import useStyles from './offers-card.styles';

const formatUserActions = (value: string[], actions: { [key: string]: string }): IDropList[] => {
    return Object.entries(actions).reduce<IDropList[]>((acc, cur) => {
        if (value.includes(cur[0])) acc.push({ name: cur[1], slug: cur[0] });
        return acc;
    }, []);
};

interface IProps {
    offer: IOfferCard;
    showFavoriteBtn?: boolean;
}

const OfferCard = ({ offer, showFavoriteBtn = true }: IProps): ReactElement => {
    const auth = useAuth();
    const css = useStyles();
    const trans = useTrans();
    const history = useRouter();
    const dispatch = useDispatch();
    const [config] = useConfig();

    const {
        id,
        can_rent,
        title,
        description,
        cover_image,
        is_promoted,
        is_deliverable,
        is_favorite,
        views,
        pub_date,
        price,
        functions,
    } = offer;

    const isLogin = (): boolean => {
        if (!auth?.access_token) {
            modal.open(
                <SmallModalWrp>
                    <LoginForm />
                </SmallModalWrp>,
            );
            return false;
        }
        return true;
    };

    const handleFavorite = (): void => {
        if (!isLogin()) return;
        dispatch({ type: types.PATCH_FAVORITE_OFFERS_START, payload: offer.id });
    };

    const handleOpenChat = (): void => {
        if (!isLogin()) return;
        history.push(routes.profile.private.newMessage(id));
    };

    const USER_ACTIONS = {
        DO_INACTIVE: trans('do_inactive'),
        ARCHIVE: trans('put_to_archive'),
        PROMOTE: trans('put_top_top'),
        EDIT: trans('edit'),
        DO_DRAFT: trans('put_top_draft'),
        DELETE: trans('delete'),
        DO_REVIEW: trans('publish'),
    };

    const handleSettings = (value: IDropValue | null): void => {
        if (!value) return;
        switch (value.slug) {
            case 'DO_INACTIVE':
                dispatch({
                    type: types.CHANGE_OFFER_STATUS_START,
                    status: 'INACTIVE',
                    offerId: offer.id,
                    callback: () => notifications.info({ message: 'Do inactive' }),
                });
                break;

            case 'ARCHIVE':
                dispatch({
                    type: types.CHANGE_OFFER_STATUS_START,
                    status: 'ARCHIVED',
                    offerId: offer.id,
                    callback: () => notifications.info({ message: 'Put to archive' }),
                });
                break;

            case 'PROMOTE':
                notifications.info({ message: 'Put top top' });
                break;

            case 'EDIT':
                history.push(routes.offers.edit(id));
                break;

            case 'DO_DRAFT':
                dispatch({
                    type: types.CHANGE_OFFER_STATUS_START,
                    status: 'DRAFT',
                    offerId: id,
                    callback: () => notifications.info({ message: 'Put top draft' }),
                });
                break;

            case 'DELETE':
                dispatch({
                    type: types.DELETE_OFFER_START,
                    offerId: id,
                    callback: () => notifications.info({ message: 'Your offer successfully deleted' }),
                });
                break;

            case 'DO_REVIEW':
                dispatch({
                    type: types.OFFER_DO_REVIEW_START,
                    offerId: id,
                    tab: String(history.query.offerStatus || 'all'),
                    page: String(history.query.page || '1'),
                    callback: () => notifications.info({ message: 'Publish success' }),
                });
                break;

            default:
                break;
        }
    };

    return (
        <div className={css.root}>
            <Link href={routes.offers.single(id)}>
                <a className={css.link}>
                    <div className={css.imgWrp}>
                        <div className={css.topWrp}>
                            {is_promoted && (
                                <Tooltip className={css.tooltip} content="Это объявление находится в топе">
                                    <div className={clsx(css.top, config.offerCardSize === 'small' && css.topSmall)}>
                                        <FontAwesomeIcon icon={faStar} />
                                    </div>
                                </Tooltip>
                            )}
                            {is_deliverable && (
                                <Tooltip className={css.tooltip} content="Автор предоставляет доставку товара">
                                    <div
                                        className={clsx(css.top, css.delivery, config.offerCardSize === 'small' && css.topSmall)}
                                    >
                                        <FontAwesomeIcon icon={faTruck} />
                                    </div>
                                </Tooltip>
                            )}
                            {can_rent && (
                                <Tooltip className={css.tooltip} content="Вы являетесь автором этого объявления">
                                    <div className={clsx(css.top, css.author, config.offerCardSize === 'small' && css.topSmall)}>
                                        <FontAwesomeIcon icon={faDotCircle} />
                                    </div>
                                </Tooltip>
                            )}
                        </div>
                        <img
                            className={config.offerCardSize === 'big' ? css.imgBig : css.imgSmall}
                            src={cover_image || '/no_img.png'}
                            alt={title}
                        />
                    </div>

                    {config.offerCardSize === 'big' ? (
                        <>
                            <h3 className={css.titleBig}>{cutString(title, 30)}</h3>
                            <p className={css.desc}>{cutString(description, 50)}</p>
                        </>
                    ) : (
                        <Tooltip
                            content={
                                <>
                                    <h4>{title}</h4>
                                    <p>{cutString(description, 50)}</p>
                                </>
                            }
                            showInMobile
                        >
                            <h3 className={css.titleSmall}>{cutString(title, 19)}</h3>
                        </Tooltip>
                    )}
                </a>
            </Link>

            {functions?.length ? (
                <DropDown
                    icon={faCogs}
                    minWidth={30}
                    height={config.offerCardSize === 'small' ? 3 : 4}
                    className={clsx(css.dropdown, config.offerCardSize === 'small' && css.dropdownSmall)}
                    onChange={handleSettings}
                    data={formatUserActions(functions, USER_ACTIONS)}
                />
            ) : null}

            {config.offerCardSize === 'big' && (
                <div className={css.info}>
                    <p className={css.text}>
                        <FontAwesomeIcon icon={faEye} />
                        <span className={css.view}>{views}</span>
                    </p>
                    <p className={css.text}>
                        {trans('date')}: {pub_date}
                    </p>
                </div>
            )}

            <div className={css.action}>
                <p className={clsx(css.price, config.offerCardSize === 'small' && css.priceSmall)}>
                    <span>{moneyFormat(price)}</span>
                    <small>{`${trans('uah')} / ${trans('day')}`}</small>
                </p>

                {showFavoriteBtn && config.offerCardSize === 'big' && (
                    <div className={css.actionBtn}>
                        {can_rent ? (
                            <>
                                <button type="button" className={css.btn} onClick={handleOpenChat}>
                                    {trans('rent')}
                                </button>

                                <Tooltip className={css.tooltip} content="Добавить в избранное">
                                    <button type="button" className={clsx(css.favorite)} onClick={handleFavorite}>
                                        {is_favorite ? (
                                            <FontAwesomeIcon icon={faSolidHeart} />
                                        ) : (
                                            <FontAwesomeIcon icon={faHeart} />
                                        )}
                                    </button>
                                </Tooltip>
                            </>
                        ) : (
                            <p className={css.cantRent}>Вы являетесь автором этого объявления</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OfferCard;
