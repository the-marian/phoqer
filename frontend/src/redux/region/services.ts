import axios, { AxiosResponse } from 'axios';

import { ICity, ICountry } from '../../interfaces';
import endpoint from '../../utils/endpoint';

const services = {
    countries: (): Promise<AxiosResponse<ICountry[]>> => axios.get(endpoint('/locations/countries')),
    cities: (slug: string): Promise<AxiosResponse<ICity[]>> => axios.get(endpoint(`/locations/cities/${slug}`)),
};

export default services;
