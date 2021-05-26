import { INewOffer } from '../../../../../interfaces';
import { IError } from './index';

interface IParams {
    value: INewOffer;
    region: boolean;
    setErrors: (error: IError) => void;
}

const validate = ({ value, setErrors, region }: IParams): boolean => {
    // check if field is empty
    if (!value.title.trim()) {
        setErrors({ title: 'required_field' });
        window.scrollTo({
            top: (document.getElementById('general')?.offsetTop || 300) - 100,
            behavior: 'smooth',
        });
        return false;
    }
    if (!region) {
        setErrors({ region: 'required_field' });
        window.scrollTo({
            top: (document.getElementById('general')?.offsetTop || 300) - 100,
            behavior: 'smooth',
        });
        return false;
    }
    if (!value.category) {
        setErrors({ category: 'required_field' });
        window.scrollTo({
            top: (document.getElementById('general')?.offsetTop || 300) - 100,
            behavior: 'smooth',
        });
        return false;
    }
    if (!value.price) {
        setErrors({ price: 'required_field' });
        window.scrollTo({
            top: (document.getElementById('general')?.offsetTop || 300) - 100,
            behavior: 'smooth',
        });
        return false;
    }
    if (!value.description.trim()) {
        setErrors({ description: 'required_field' });
        window.scrollTo({
            top: (document.getElementById('description')?.offsetTop || 300) - 100,
            behavior: 'smooth',
        });
        return false;
    }

    // check optional fields
    if (value.optional.deposit_val && !value.deposit_val) {
        setErrors({ deposit_val: 'enter_data_or_disable_field' });
        window.scrollTo({
            top: (document.getElementById('description')?.offsetTop || 300) - 100,
            behavior: 'smooth',
        });
        return false;
    }
    if (value.optional.min_rent_period && !value.min_rent_period) {
        setErrors({ min_rent_period: 'enter_data_or_disable_field' });
        window.scrollTo({
            top: (document.getElementById('description')?.offsetTop || 300) - 100,
            behavior: 'smooth',
        });
        return false;
    }
    if (value.optional.max_rent_period && !value.max_rent_period) {
        setErrors({ max_rent_period: 'enter_data_or_disable_field' });
        window.scrollTo({
            top: (document.getElementById('description')?.offsetTop || 300) - 100,
            behavior: 'smooth',
        });
        return false;
    }

    return true;
};

export default validate;
