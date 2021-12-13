import { AxiosResponse } from 'axios';

import { ICity, ICountry } from '../../interfaces';
import endpoint from '../../utils/endpoint';
import api from '../../utils/interceptors';

const services = {
    countries: (): Promise<AxiosResponse<ICountry[]>> => api.get(endpoint('/locations/countries')),
    cities: (slug: string): Promise<AxiosResponse<ICity[]>> => api.get(endpoint(`/locations/cities/${slug}`)),
};

export default services;
