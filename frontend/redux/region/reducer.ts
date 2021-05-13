import { ICity, ICountry, IRegion } from '../../interfaces';
import initState from '../state';
import types from '../types';
import IAction from './interfaces';

const region = (state: IRegion = initState.region, { type, payload }: IAction): IRegion => {
    switch (type) {
        case types.GET_CITIES_START:
        case types.GET_COUNTRIES_START:
            return { ...state, loading: true };

        case types.GET_COUNTRIES_SUCCESS:
            return { ...state, countries: payload as ICountry[], loading: false };

        case types.GET_CITIES_SUCCESS:
            return { ...state, cities: payload as ICity[], loading: false };

        case types.SELECT_COUNTRY:
            return { ...state, countries: [], selected: { country: payload as string, city: '' } };

        case types.SELECT_CITY:
            return {
                ...state,
                cities: [],
                countries: [],
                selected: { country: state.selected?.country || '', city: payload as string },
            };

        case types.GET_CITIES_ERROR:
        case types.GET_COUNTRIES_ERROR:
            return { ...state, loading: false };

        default:
            return state;
    }
};

export default region;
