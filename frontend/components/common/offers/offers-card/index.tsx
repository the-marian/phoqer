import { faEye } from '@fortawesome/free-regular-svg-icons/faEye';
import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart';
import { faCogs } from '@fortawesome/free-solid-svg-icons/faCogs';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faTruck } from '@fortawesome/free-solid-svg-icons/faTruck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { moneyFormat } from '../../../../assets/helpers';
import routes from '../../../../assets/routes';
import useAuth from '../../../../hooks/auth.hook';
import useTrans from '../../../../hooks/trans.hook';
import { IDropList, IDropValue, IOfferCard } from '../../../../interfaces';
import types from '../../../../redux/types';
import LoginForm from '../../auth/login-form';
import DropDown from '../../drop-down';
import { modal } from '../../modal';
import SmallModalWrp from '../../modal/small-modal-wrp';
import useStyles from './offers-card.styles';

const MAX_LENGTH = 55;
const MAX_LENGTH_TITLE = 50;

const USER_ACTIONS = {
    DO_INACTIVE: 'Деактевировать обьявление',
    ARCHIVE: 'Поместить в архив',
    PROMOTE: 'Поместить в топ',
    EDIT: 'Редактировать',
    DELETE: 'Удалить',
    DO_REVIEW: 'Опубликовать',
};

const formatUserActions = (value: string[]): IDropList[] => {
    return Object.entries(USER_ACTIONS).reduce<IDropList[]>((acc, cur) => {
        if (value.includes(cur[0])) acc.push({ name: cur[1], slug: cur[0] });
        return acc;
    }, []);
};

interface IProps {
    offer: IOfferCard;
    showFavoriteBtn?: boolean;
}

const OfferCard = ({ offer, showFavoriteBtn = true }: IProps): ReactElement => {
    const T = useTrans();
    const auth = useAuth();
    const css = useStyles();
    const history = useRouter();
    const dispatch = useDispatch();

    const {
        id,
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

    const handleFavorite = (): void => {
        if (!auth?.access_token) {
            modal.open(
                <SmallModalWrp>
                    <LoginForm />
                </SmallModalWrp>,
            );
            return;
        }
        dispatch({ type: types.PATCH_FAVORITE_OFFERS_START, payload: offer.id });
    };

    const handleSettings = (value: IDropValue | null): void => {
        if (!value) return;
        switch (value.slug) {
            case 'DO_INACTIVE':
                alert('Деактевировать обьявление');
                break;

            case 'ARCHIVE':
                alert('Поместить в архив');
                break;

            case 'PROMOTE':
                alert('Поместить в топ');
                break;

            case 'EDIT':
                history.push(routes.offers.edit(id));
                break;

            case 'DELETE':
                alert('Удалить');
                break;

            case 'DO_REVIEW':
                alert('Опубликовать');
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
                                <div className={css.top}>
                                    <FontAwesomeIcon icon={faStar} />
                                </div>
                            )}
                            {is_deliverable && (
                                <div className={clsx(css.top, css.delivery)}>
                                    <FontAwesomeIcon icon={faTruck} />
                                </div>
                            )}
                        </div>
                        <img className={css.img} src={cover_image || '/no_img.png'} alt={title} />
                    </div>
                    <h3 className={css.title}>
                        {title.length > MAX_LENGTH_TITLE ? title.slice(0, MAX_LENGTH_TITLE - 3) + '...' : title}
                    </h3>
                    <p className={css.desc}>
                        {description.length > MAX_LENGTH ? `${description.slice(0, MAX_LENGTH - 3)}...` : description}
                    </p>
                </a>
            </Link>

            {functions?.length ? (
                <DropDown
                    icon={faCogs}
                    minWidth={20}
                    height={5}
                    className={css.dropdown}
                    onChange={handleSettings}
                    data={formatUserActions(functions)}
                />
            ) : null}

            <div className={css.info}>
                <p className={css.text}>
                    <FontAwesomeIcon icon={faEye} />
                    <span className={css.view}>{views}</span>
                </p>
                <p className={css.text}>
                    {T.date}: {pub_date}
                </p>
            </div>

            <div className={css.action}>
                <p className={css.price}>
                    <span>{moneyFormat(price)}.00</span>
                    <small>{`*${T.uah}/${T.day}`}</small>
                </p>

                {showFavoriteBtn && (
                    <div className={css.actionBtn}>
                        <button type="button" className={css.btn}>
                            {T.rent}
                        </button>

                        <button type="button" className={clsx(css.favorite)} onClick={handleFavorite}>
                            {is_favorite ? <FontAwesomeIcon icon={faSolidHeart} /> : <FontAwesomeIcon icon={faHeart} />}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OfferCard;
