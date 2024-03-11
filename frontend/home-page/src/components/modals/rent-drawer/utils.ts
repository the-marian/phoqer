import { RentPayload } from './type';

export const RENT_DRAWER_DATA_KEY = 'rent-drawer-data';

export const initialValues: RentPayload = {
    country: '',
    city: '',
    zip: '',
    address: '',
    comment: '',
};

export const getInitialValues = (): RentPayload => {
    try {
        const json = localStorage.getItem(RENT_DRAWER_DATA_KEY);
        if (!json) {
            return initialValues;
        }

        const data = JSON.parse(json);
        return data || initialValues;
    } catch {
        return initialValues;
    }
};

export const setInitialValues = (value: RentPayload): void => {
    try {
        localStorage.setItem(RENT_DRAWER_DATA_KEY, JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
};
