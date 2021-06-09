import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import template from '../../../../../assets/template';
import { Theme } from '../../../../../assets/theme';
import useTrans from '../../../../../hooks/trans.hook';
import { IOfferCard, IState } from '../../../../../interfaces';
import types from '../../../../../redux/types';
import ButtonClose from '../../../../common/button-close';
import Tooltip from '../../../../common/tooltip';

const useStyles = createUseStyles((theme: Theme) => ({
    title: {
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[3],
        color: theme.palette.black[0],
    },
    imgUl: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 -1.5%',

        ...theme.media(768).max({
            margin: '0 -2.5%',
        }),
    },
    imgLi: {
        position: 'relative',
        width: '22%',
        margin: '1.5%',
        height: theme.rem(18),

        ...theme.media(768).max({
            width: '45%',
            margin: '2.5%',
        }),
    },
    inner: {
        width: '100%',
        height: '100%',
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: theme.radius,
        objectFit: 'cover',
        cursor: 'pointer',
        ...template(theme).outline,
    },
    active: {
        border: theme.border(0.2, theme.palette.primary[0]),
    },
    activeText: {
        position: 'absolute',
        bottom: theme.rem(1),
        left: theme.rem(1),
        padding: theme.rem(0.4, 1),
        fontSize: theme.rem(1.4),
        background: theme.palette.white,
        borderRadius: theme.radius,
    },
    close: {
        position: 'absolute',
        top: theme.rem(0.5),
        right: theme.rem(0.5),
        background: theme.palette.white,
    },
}));

const PhotosItem = ({ url, isActive = false }: { url: string; isActive?: boolean }): ReactElement | null => {
    const css = useStyles();
    const trans = useTrans();
    const dispatch = useDispatch();

    const handleClick = (): void => {
        dispatch({ type: types.DELETE_SINGLE_OFFER_IMG, payload: url });
    };

    const handleChangeCoverImage = (): void => {
        dispatch({ type: types.CHANGE_OFFER_COVER_IMAGE_LOCAL, payload: url });
    };

    return (
        <li className={css.imgLi} key={url}>
            <Tooltip content="click_to_select_main" classNameWrp={css.inner}>
                <>
                    {isActive && <p className={css.activeText}>{trans('main_photo')}</p>}
                    <ButtonClose className={css.close} onClick={handleClick} />
                    <img
                        aria-hidden="true"
                        onClick={handleChangeCoverImage}
                        className={clsx(css.img, isActive && css.active)}
                        src={url}
                        alt=""
                    />
                </>
            </Tooltip>
        </li>
    );
};

const PhotosList = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const offer = useSelector<IState, IOfferCard | null>(state => state.offers.single);

    return (
        <>
            <h3 className={css.title}>{trans('click_to_select_main')}</h3>
            {offer?.images?.length ? (
                <ul className={css.imgUl}>
                    {offer.images.map<ReactElement>(url => (
                        <PhotosItem url={url} key={url} isActive={offer?.cover_image === url} />
                    ))}
                </ul>
            ) : null}
        </>
    );
};

export default PhotosList;
