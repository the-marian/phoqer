export interface ICountry {
    slug: string;
}

export interface ICity {
    slug: string;
    countries_slug: string;
}

export interface IRegion {
    loading: boolean;
    countries?: ICountry[];
    cities?: ICity[];
    selected?: {
        country: string;
        city: string;
    };
}
