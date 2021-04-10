import { INewOffer } from '../../../../../interfaces';
import { IError } from './index';

interface IParams {
    value: INewOffer;
    setErrors: (error: IError) => void;
}

const validate = ({ value, setErrors }: IParams): boolean => {
    // check if field is empty
    if (!value.title.trim()) {
        setErrors({ title: 'Это обязательное поле' });
        window.scrollTo({
            top: (document.getElementById('general')?.offsetTop || 300) - 100,
            behavior: 'smooth',
        });
        return false;
    }
    if (!value.category) {
        setErrors({ category: 'Это обязательное поле' });
        window.scrollTo({
            top: (document.getElementById('general')?.offsetTop || 300) - 100,
            behavior: 'smooth',
        });
        return false;
    }
    if (!value.price) {
        setErrors({ price: 'Это обязательное поле' });
        window.scrollTo({
            top: (document.getElementById('general')?.offsetTop || 300) - 100,
            behavior: 'smooth',
        });
        return false;
    }
    if (!value.description.trim()) {
        setErrors({ description: 'Это обязательное поле' });
        window.scrollTo({
            top: (document.getElementById('description')?.offsetTop || 300) - 100,
            behavior: 'smooth',
        });
        return false;
    }

    // check optional fields
    if (value.optional.deposit_val && !value.deposit_val) {
        setErrors({ deposit_val: 'Введите данные или отключите это поле' });
        window.scrollTo({
            top: (document.getElementById('description')?.offsetTop || 300) - 100,
            behavior: 'smooth',
        });
        return false;
    }
    if (value.optional.min_rent_period && !value.min_rent_period) {
        setErrors({ min_rent_period: 'Введите данные или отключите это поле' });
        window.scrollTo({
            top: (document.getElementById('description')?.offsetTop || 300) - 100,
            behavior: 'smooth',
        });
        return false;
    }
    if (value.optional.max_rent_period && !value.max_rent_period) {
        setErrors({ max_rent_period: 'Введите данные или отключите это поле' });
        window.scrollTo({
            top: (document.getElementById('description')?.offsetTop || 300) - 100,
            behavior: 'smooth',
        });
        return false;
    }

    return true;
};

export default validate;
