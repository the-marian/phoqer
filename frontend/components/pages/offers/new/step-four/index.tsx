import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import routes from '../../../../../assets/routes';
import template from '../../../../../assets/template';
import { Theme } from '../../../../../assets/theme';
import useTrans from '../../../../../hooks/trans.hook';
import { IOfferCard, IPublicProfile, IState } from '../../../../../interfaces';
import types from '../../../../../redux/types';
import Button from '../../../../common/button';
import OffersLoader from '../../../../common/loaders/skeletons/offers';
import RectSkeleton from '../../../../common/loaders/skeletons/rect';
import TextSkeleton from '../../../../common/loaders/skeletons/text';
import OfferCard from '../../../../common/offers/offers-card';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '50%',
        minWidth: theme.rem(40),
        margin: '0 auto',
        padding: theme.rem(5, 0),
    },
    loading: {
        width: '100%',
    },
    imagesLoader: {
        margin: theme.rem(0, 0, 4),
    },
    offer: {
        width: theme.rem(35),
        margin: '2rem auto',
        pointerEvents: 'none',
    },
    title: {
        maxWidth: theme.rem(50),
        margin: '0 auto 4rem',
        fontSize: theme.rem(2.4),
        textAlign: 'center',
        color: theme.palette.green[0],
    },
    images: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    imgBtn: {
        width: '32%',
        margin: '0 2% 1rem 0',
        '&:nth-of-type(3n)': {
            marginRight: 0,
        },
    },
    img: {
        width: '100%',
        height: theme.rem(14),
        objectFit: 'cover',
        borderRadius: theme.radius,
        ...template(theme).outline,
    },
    active: {
        pointerEvents: 'none',
        border: theme.border(0.2, theme.palette.primary[0]),
    },
    text: {
        width: theme.rem(35),
        margin: '4rem auto 0',
        fontSize: theme.rem(1.6),
        textAlign: 'center',
    },
    btnWrp: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: theme.rem(6, 0, 4),

        ...theme.media(768).max({
            flexDirection: 'column',
            margin: theme.rem(0, 0, 2),
        }),
    },
    next: {
        height: theme.rem(5),
        padding: theme.rem(1, 4),
        marginLeft: theme.rem(2),
        background: theme.palette.primary[0],
        fontSize: theme.rem(1.4),
        color: theme.palette.trueWhite,
        borderRadius: theme.radius,

        ...theme.media(768).max({
            margin: theme.rem(2, 0, 0),
            padding: theme.rem(2, 4),
        }),
    },
}));

interface IProps {
    url: string;
    index: number;
    active: number;
    onClick: (index: number) => void;
}
const ImageCatd = ({ url, index, active, onClick }: IProps): ReactElement => {
    const css = useStyles();

    const handleClick = (): void => onClick(index);

    return (
        <button type="button" className={css.imgBtn} onClick={handleClick}>
            <img className={clsx(css.img, index === active && css.active)} key={url} src={url} alt="" />
        </button>
    );
};

const StepFour = (): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();
    const trans = useTrans();
    const history = useRouter();
    const offerId = String(history.query.offerId || '');

    const [loading, setLoading] = useState<boolean>(false);
    const [imgIndex, setImgIndex] = useState<number>(0);

    const user = useSelector<IState, IPublicProfile>(state => state.user);
    const offer = useSelector<IState, IOfferCard | null>(state => state.offers.single);

    useEffect(() => {
        if (offer) {
            if (offer?.author_id && offer.author_id !== user.id) history.push(routes.root);
            if (!offer?.images || offer.images?.length < 2) history.push(routes.offers.new(5, offerId));
        }
    }, [offer]);

    useEffect(() => {
        if (offerId) dispatch({ type: types.GET_SINGLE_OFFER_START, payload: offerId });
    }, [offerId]);

    const handleClick = (): void => {
        setLoading(true);
        dispatch({
            type: types.CHANGE_OFFER_COVER_IMAGE_START,
            offerId,
            payload: offer?.images?.[imgIndex] || '',
            callback: () => history.push(routes.offers.new(5, offerId)),
        });
    };

    return (
        <div className={css.wrp}>
            <h2 className={css.title}>Выберите главное фото для вашего обьявления</h2>
            {!offer ? (
                <div className={css.loading}>
                    <RectSkeleton amount={3} className={css.imagesLoader} />
                    <TextSkeleton />
                    <OffersLoader className={css.offer} />
                </div>
            ) : (
                <>
                    <div className={css.images}>
                        {offer.images?.map<ReactElement>((url, index) => (
                            <ImageCatd key={url} url={url} index={index} onClick={setImgIndex} active={imgIndex} />
                        ))}
                    </div>

                    <p className={css.text}>Такой будет выглядеть ваше объявления на сайте. </p>
                    <div className={css.offer}>
                        <OfferCard showFavoriteBtn={false} offer={{ ...offer, cover_image: offer?.images?.[imgIndex] || '' }} />
                    </div>

                    <div className={css.btnWrp}>
                        <Button type="button" className={css.next} onClick={handleClick} loading={loading}>
                            {trans('next')}
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default StepFour;
