import React, { ReactElement } from 'react';

import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons/faDotCircle';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons/faSlidersH';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faTruck } from '@fortawesome/free-solid-svg-icons/faTruck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import useAuth from '../../../../hooks/auth.hook';
import useMedia from '../../../../hooks/media.hook';
import useTrans from '../../../../hooks/trans.hook';
import { IDropList, IDropValue, IOfferCard, IPublicProfile, IState } from '../../../../interfaces';
import types from '../../../../redux/types';
import { cutString, moneyFormat } from '../../../../utils/helpers';
import routes from '../../../../utils/routes';
import NewChatModal from '../../../pages/chat/components/new-chat-modal';
import LoginForm from '../../auth/forms/login-form';
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
    const css = useStyles();

    const trans = useTrans();
    const { token } = useAuth();
    const history = useRouter();
    const dispatch = useDispatch();
    const media = useMedia(768);

    const profile = useSelector<IState, IPublicProfile | null>(state => state.user);

    const { id, title, description, cover_image, is_promoted, is_deliverable, is_favorite, price, functions, user_id } = offer;
    const canRent = user_id !== profile?.id;

    const isLogin = (): boolean => {
        if (!token.access_token) {
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
        modal.open(<NewChatModal offer={offer} />);
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
                                    <div className={clsx(css.top, !media && css.topSmall)}>
                                        <FontAwesomeIcon icon={faStar} />
                                    </div>
                                </Tooltip>
                            )}
                            {is_deliverable && (
                                <Tooltip className={css.tooltip} content="Автор предоставляет доставку товара">
                                    <div className={clsx(css.top, css.delivery, !media && css.topSmall)}>
                                        <FontAwesomeIcon icon={faTruck} />
                                    </div>
                                </Tooltip>
                            )}
                            {!canRent && (
                                <Tooltip className={css.tooltip} content="Вы являетесь автором этого объявления">
                                    <div className={clsx(css.top, css.author, !media && css.topSmall)}>
                                        <FontAwesomeIcon icon={faDotCircle} />
                                    </div>
                                </Tooltip>
                            )}
                        </div>
                        <img className={media ? css.imgBig : css.imgSmall} src={cover_image || '/icons/no_img.png'} alt={title} />
                    </div>

                    {media ? (
                        <>
                            <h3 className={css.titleBig}>{title}</h3>
                            <p className={css.desc}>{description}</p>
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
                            <h3 className={css.titleSmall}>{title}</h3>
                        </Tooltip>
                    )}
                </a>
            </Link>

            {functions?.length ? (
                <DropDown
                    icon={faSlidersH}
                    minWidth={30}
                    height={media ? 4 : 3}
                    className={clsx(css.dropdown, !media && css.dropdownSmall)}
                    onChange={handleSettings}
                    data={formatUserActions(functions, USER_ACTIONS)}
                />
            ) : null}

            <div className={css.action}>
                <p className={clsx(css.price, !media && css.priceSmall)}>
                    <span>{moneyFormat(price)}</span>
                    <small>{`${trans('uah')} / ${trans('day')}`}</small>
                </p>

                {showFavoriteBtn && media && (
                    <div className={css.actionBtn}>
                        {canRent ? (
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
                            <p className={css.cantRent}>Вы не можете арендовать это объявление</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OfferCard;
