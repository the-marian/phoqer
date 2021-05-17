import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';
import { ICity, IRegion, IState } from '../../../../interfaces';
import types from '../../../../redux/types';
import content from '../../../../translations';
import Input from '../../input';
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
    input: {
        marginBottom: theme.rem(2),
    },
    btn: {
        ...template(theme).btn,
        margin: theme.rem(0.4, 0),
        background: theme.palette.gray[0],
        color: theme.palette.black[0],
    },
    back: {
        color: theme.palette.black[0],
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
    country: {
        marginBottom: theme.rem(1),
        color: theme.palette.black[0],
        fontSize: theme.rem(1.8),
    },
}));

interface ICitiesList {
    city: string;
}

const CitiesList = ({ city }: ICitiesList): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const dispatch = useDispatch();

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

interface IContent {
    [key: string]: string;
}

interface ILocales {
    [key: string]: IContent;
}

const CityModal = (): ReactElement => {
    const css = useStyles();
    const { locale } = useRouter();
    const dispatch = useDispatch();

    const trans = (value: string): string => {
        return (content as ILocales)[locale || 'en'][value] || String(value);
    };

    const [search, setSearch] = useState<string>('');
    const [cities, setCities] = useState<ICity[]>([]);
    const region = useSelector<IState, IRegion>(state => state.region);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
        setCities(
            region?.cities?.length
                ? region?.cities?.filter(item =>
                      event.target.value ? trans(item.slug).toLowerCase().includes(event.target.value.toLowerCase()) : item,
                  )
                : [],
        );
        setSearch(event.target.value);
    };

    useEffect(() => {
        dispatch({ type: types.GET_CITIES_START, payload: region.selected?.country || 'ukraine' });
    }, []);

    useEffect(() => {
        if (region?.cities?.length) setCities(region.cities);
    }, [region]);

    const handleBack = (): void => {
        modal.open(<CountryModal />);
    };

    return (
        <SmallModalWrp>
            <div className={css.root}>
                <p className={css.country}>{trans(region.selected?.country || '')}:</p>
                <Input
                    type="text"
                    placeholder={trans('search_city')}
                    className={css.input}
                    onChange={handleSearch}
                    value={search}
                />

                <button type="button" className={css.back} onClick={handleBack}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    {trans('back')}
                </button>

                {!region.loading && cities.length ? (
                    <div className={css.inner}>
                        {cities.length ? cities.map(item => <CitiesList key={item.slug} city={item.slug} />) : null}
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
