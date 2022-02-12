import { AxiosResponse } from 'axios';

import api from '../../api';
import { ICity, ICountry } from '../../interfaces';
import endpoint from '../../utils/endpoint';

const services = {
    countries: (): Promise<AxiosResponse<ICountry[]>> => api.get(endpoint('/locations/countries')),
    cities: (slug: string): Promise<AxiosResponse<ICity[]>> => api.get(endpoint(`/locations/cities/${slug}`)),
};

export default services;
