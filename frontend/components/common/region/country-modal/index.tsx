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
import CityModal from '../city-modal';

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
}));

interface ICountriesList {
    country: string;
}
const CountriesList = ({ country }: ICountriesList): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const dispatch = useDispatch();

    const handleClick = (): void => {
        dispatch({ type: types.SELECT_COUNTRY, payload: country });
        modal.open(<CityModal />);
    };

    return (
        <button className={css.btn} type="button" onClick={handleClick}>
            {trans(country)}
        </button>
    );
};

const CountryModal = (): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();
    const region = useSelector<IState, IRegion>(state => state.region);

    useEffect(() => {
        dispatch({ type: types.GET_COUNTRIES_START });
    }, []);

    return (
        <SmallModalWrp>
            <div className={css.root}>
                {!region.loading && region?.countries?.length ? (
                    <div className={css.inner}>
                        {region?.countries?.length
                            ? region?.countries?.map(item => <CountriesList key={item.slug} country={item.slug} />)
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

export default CountryModal;
