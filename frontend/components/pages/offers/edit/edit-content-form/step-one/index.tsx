import clsx from 'clsx';
import React, { ChangeEvent, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { numberValidation } from '../../../../../../assets/helpers';
import * as helpers from '../../../../../../assets/helpers';
import useTrans from '../../../../../../hooks/trans.hook';
import { ICategories, IDropList, IDropValue, INewOffer, IState } from '../../../../../../interfaces';
import DropDown from '../../../../../common/drop-down';
import Input from '../../../../../common/input';
import Region from '../../../../../common/region';
import Tooltip from '../../../../../common/tooltip';
import { IError } from '../';
import editOfferTemplate from '../edit-content-form.style';

const useStyles = createUseStyles(editOfferTemplate);

interface IProps {
    value: INewOffer;
    errors: IError;
    setValue: (value: INewOffer) => void;
    setErrors: (error: IError) => void;
}

const PERIOD: IDropList[] = [
    { slug: 'HOUR', name: 'hourly' },
    { slug: 'DAY', name: 'daily' },
    { slug: 'MONTH', name: 'monthly' },
];
const CURRENCY: IDropList[] = [
    { slug: 'UAH', name: 'uah' },
    { slug: 'USD', name: 'usd' },
    { slug: 'PLN', name: 'pln' },
    { slug: 'EUR', name: 'eur' },
];

const StepOne = ({ value, errors, setErrors, setValue }: IProps): ReactElement => {
    const css = useStyles();
    const data = useSelector<IState, ICategories[]>(state => state.categories);
    const categories = helpers.formatCatList(data);
    const trans = useTrans();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setValue({ ...(value || {}), [event.target.name]: event.target.value });
        setErrors({});
    };
    const handleRentalPeriod = (rental_period: IDropValue | null): void => {
        setValue({ ...value, rental_period });
        setErrors({});
    };
    const handleCurrency = (currency: IDropValue | null): void => {
        setValue({ ...value, currency });
        setErrors({});
    };
    const handleCategory = (category: IDropValue | null): void => {
        setValue({ ...value, category });
        setErrors({});
    };

    const validateNumber = (name: 'price' | 'items_amount', defaultValue: number | null = null): void => {
        const num = value[name];
        if (numberValidation(String(num))) return setValue({ ...value, [name]: defaultValue });
        setValue({ ...value, [name]: num ? Math.round(+num * 100) / 100 : defaultValue });
        setErrors({});
    };

    const validatePrice = (): void => validateNumber('price');
    const validateAmount = (): void => validateNumber('items_amount', 1);

    return (
        <>
            <h2 className={css.title} id="general">
                {trans('main')}
            </h2>
            <div className={css.inner}>
                <h3 className={css.subtitle}>
                    {trans('offer_title')} <span className={css.red}>*</span>
                </h3>
                <Input
                    value={value.title || ''}
                    onChange={handleChange}
                    name="title"
                    type="text"
                    placeholder="name"
                    errors={errors.title}
                />
            </div>

            <div className={css.flex}>
                <div className={css.inner}>
                    <h4 className={css.subtitle}>
                        {trans('select_rental_period')} <span className={css.red}>*</span>
                    </h4>
                    <div className={clsx(errors.rental_period && css.errors)}>
                        <DropDown
                            data={PERIOD}
                            defaultValue={value.rental_period as IDropValue}
                            placeholder="select_rental_period"
                            onChange={handleRentalPeriod}
                            withSub
                            white
                        />
                    </div>
                    {errors.rental_period && <small className={css.errorsText}>{trans(errors.rental_period)}</small>}
                </div>

                <div className={css.inner}>
                    <h4 className={css.subtitle}>
                        {trans('currency')} <span className={css.red}>*</span>
                    </h4>
                    <div className={clsx(errors.currency && css.errors)}>
                        <DropDown
                            data={CURRENCY}
                            defaultValue={value.currency as IDropValue}
                            placeholder="select_currency"
                            onChange={handleCurrency}
                            capitalize={false}
                            withSub
                            white
                        />
                    </div>
                    {errors.currency && <small className={css.errorsText}>{trans(errors.currency)}</small>}
                </div>
            </div>
            <div className={css.flex}>
                {!!categories.length && (
                    <div className={css.inner}>
                        <h3 className={css.subtitle}>
                            {trans('select_product_category')} <span className={css.red}>*</span>
                        </h3>
                        <div className={clsx(errors.category && css.errors)}>
                            <DropDown
                                data={categories}
                                defaultValue={value.category}
                                placeholder="select_category"
                                onChange={handleCategory}
                                withSub
                                white
                            />
                        </div>
                        {errors.category && <small className={css.errorsText}>{errors.category}</small>}
                    </div>
                )}
                <div className={css.inner}>
                    <h4 className={css.subtitle}>
                        {trans('price')} {trans(value.currency?.slug?.toLowerCase() || 'uah')}/
                        {trans(value.rental_period?.slug?.toLowerCase() || 'day')}
                        <span className={css.red}>*</span>
                    </h4>
                    <Input
                        value={value.price || ''}
                        onChange={handleChange}
                        onBlur={validatePrice}
                        type="text"
                        placeholder="price"
                        name="price"
                        errors={errors.price}
                    />
                </div>
            </div>
            <div className={css.flex}>
                <div className={css.inner}>
                    <h4 className={css.subtitle}>
                        {trans('indicate_your_location')} <span className={css.red}>*</span>
                    </h4>
                    <Region error={errors.region} resetError={setErrors} />
                </div>
                <div className={css.inner}>
                    <h4 className={css.subtitle}>{trans('amount_of_goods')}</h4>
                    <Tooltip content="for_renting_material_things">
                        <Input
                            value={value.items_amount || ''}
                            onChange={handleChange}
                            onBlur={validateAmount}
                            name="items_amount"
                            type="text"
                            placeholder="amount"
                            errors={errors.price}
                        />
                    </Tooltip>
                </div>
            </div>
        </>
    );
};

export default StepOne;
