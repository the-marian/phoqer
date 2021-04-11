import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { Theme } from '../../../../../assets/theme';
import { IOfferCard, IState } from '../../../../../interfaces';
import types from '../../../../../redux/types';
import ButtonClose from '../../../../common/button-close';

const useStyles = createUseStyles((theme: Theme) => ({
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
    img: {
        width: '100%',
        height: '100%',
        borderRadius: theme.radius,
        objectFit: 'cover',
    },
    close: {
        position: 'absolute',
        top: theme.rem(0.5),
        right: theme.rem(0.5),
        background: theme.palette.white,
    },
}));

const PhotosItem = ({ url }: { url: string }): ReactElement | null => {
    const css = useStyles();
    const dispatch = useDispatch();

    const handleClick = (): void => {
        dispatch({ type: types.DELETE_SINGLE_OFFER_IMG, payload: url });
    };

    return (
        <li className={css.imgLi} key={url}>
            <ButtonClose className={css.close} onClick={handleClick} />
            <img className={css.img} src={url} alt="" />
        </li>
    );
};

const PhotosList = (): ReactElement | null => {
    const css = useStyles();
    const offer = useSelector<IState, IOfferCard | null>(state => state.offers.single);

    return offer?.images?.length ? (
        <ul className={css.imgUl}>
            {offer.images.map<ReactElement>(url => (
                <PhotosItem url={url} key={url} />
            ))}
        </ul>
    ) : null;
};

export default PhotosList;
