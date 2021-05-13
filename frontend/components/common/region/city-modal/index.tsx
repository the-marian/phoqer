import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';
import { IRegion, IState } from '../../../../interfaces';
import types from '../../../../redux/types';
import Spinner from '../../loaders/spinner';
import { modal } from '../../modal';
import SmallModalWrp from '../../modal/small-modal-wrp';
import CountryModal from '../country-modal';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        fontSize: theme.rem(1.4),
    },
    spinner: {
        height: theme.rem(10),
        width: theme.rem(10),

        '& img': {
            height: theme.rem(3),
            width: theme.rem(3),
        },
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inner: {
        display: 'flex',
        flexDirection: 'column',
    },
    btn: {
        ...template(theme).btn,
        margin: theme.rem(0.4, 0),
        background: theme.palette.gray[0],
        color: theme.palette.black[0],
    },
    back: {
        padding: theme.rem(1, 4, 1, 0),

        ...theme.hover({
            color: theme.palette.primary[0],
            textDecoration: 'underline',
        }),

        '& svg': {
            margin: theme.rem(0, 0.5, 0.2, 0),
            fontSize: theme.rem(1.2),
        },
    },
}));

interface ICitiesList {
    city: string;
}
const CitiesList = ({ city }: ICitiesList): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const dispatch = useDispatch();
    console.log(city);

    const handleClick = (): void => {
        dispatch({ type: types.SELECT_CITY, payload: city });
        modal.close();
    };

    return (
        <button className={css.btn} type="button" onClick={handleClick}>
            {trans(city)}
        </button>
    );
};

const CityModal = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const dispatch = useDispatch();
    const region = useSelector<IState, IRegion>(state => state.region);

    useEffect(() => {
        dispatch({ type: types.GET_CITIES_START, payload: region.selected?.country || 'ukraine' });
    }, []);

    const handleBack = (): void => {
        modal.open(<CountryModal />);
    };

    return (
        <SmallModalWrp>
            <div className={css.root}>
                <button type="button" className={css.back} onClick={handleBack}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    {trans('back')}
                </button>

                {!region.loading && region?.cities?.length ? (
                    <div className={css.inner}>
                        {region?.cities?.length
                            ? region?.cities?.map(item => <CitiesList key={item.slug} city={item.slug} />)
                            : null}
                    </div>
                ) : (
                    <div className={css.center}>
                        <Spinner className={css.spinner} />
                    </div>
                )}
            </div>
        </SmallModalWrp>
    );
};

export default CityModal;
