import { faSave } from '@fortawesome/free-regular-svg-icons/faSave';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons/faTrashAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import * as helpers from '../../../../../assets/helpers';
import { numberValidation } from '../../../../../assets/helpers';
import routes from '../../../../../assets/routes';
import { Theme } from '../../../../../assets/theme';
import useTrans from '../../../../../hooks/trans.hook';
import { ICategories, IDropList, IDropValue, INewOffer, IRegion, IState } from '../../../../../interfaces';
import types from '../../../../../redux/types';
import DropDown from '../../../../common/drop-down';
import Input from '../../../../common/input';
import Region from '../../../../common/region';
import Tooltip from '../../../../common/tooltip';
import newOfferTemplate from '../new-offer.style';

const useStyles = createUseStyles((theme: Theme) => newOfferTemplate(theme).step);

interface IError {
    title?: string;
    price?: string;
    category?: string;
    region?: string;
    items_amount?: string;
    rental_period?: string;
    currency?: string;
}

const notDone = (value: INewOffer, dispatch: Dispatch): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch({ type: types.NEW_OFFER_FORM, payload: { ...value, isDone: { ...value.isDone, one: false } } });
};

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

const StepThree = (): ReactElement => {
    const css = useStyles();
    const history = useRouter();
    const trans = useTrans();
    const dispatch = useDispatch();

    const [errors, setErrors] = useState<IError>({});
    const region = useSelector<IState, IRegion>(state => state.region);
    const init = useSelector<IState, INewOffer>(state => state.offers.new_offer);
    const [value, setValue] = useState<INewOffer>(init);

    // categories
    const data = useSelector<IState, ICategories[]>(state => state.categories);
    const categories = helpers.formatCatList(data);

    // event handlers
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setValue({ ...value, [event.target.name]: event.target.value });
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

    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();

        if (!value.title.trim()) {
            setErrors({ title: 'required_field' });
            notDone(value, dispatch);
            return;
        }

        if (!region.selected) {
            setErrors({ region: 'required_field' });
            notDone(value, dispatch);
            return;
        }

        if (!value.rental_period) {
            setErrors({ rental_period: 'required_field' });
            notDone(value, dispatch);
            return;
        }

        if (!value.currency) {
            setErrors({ currency: 'required_field' });
            notDone(value, dispatch);
            return;
        }

        if (!value.category) {
            setErrors({ category: 'required_field' });
            notDone(value, dispatch);
            return;
        }

        if (!value.price && value.price !== 0) {
            setErrors({ price: 'required_field' });
            notDone(value, dispatch);
            return;
        }

        dispatch({
            type: types.NEW_OFFER_FORM,
            payload: {
                ...value,
                isDone: { ...value.isDone, one: true },
            },
        });
        history.push(routes.offers.new(2), undefined, { shallow: true });
    };

    const handleClear = (): void => {
        const reset: INewOffer = {
            ...value,
            title: '',
            price: null,
            category: null,
            items_amount: 1,
            currency: { name: 'uah', slug: 'UAH', type: 'main' },
            rental_period: { name: 'daily', slug: 'DAY', type: 'main' },
            isDone: {
                one: false,
                two: false,
                three: false,
            },
        };
        setValue(reset);
        setErrors({});
        dispatch({ type: types.NEW_OFFER_FORM, payload: reset });
    };

    const handleSave = (): void => {
        dispatch({
            type: types.NEW_OFFER_FORM,
            payload: value,
        });
        dispatch({
            type: types.POST_OFFER_START,
            payload: null,
            callback: (offerId: string) => history.push(routes.offers.new('draft', offerId), undefined, { shallow: true }),
        });
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.inner}>
                <h4 className={css.title}>
                    {trans('come_up_with_a_title')} <span className={css.red}>*</span>
                </h4>
                <Input
                    value={value.title}
                    onChange={handleChange}
                    className={css.input}
                    name="title"
                    type="text"
                    placeholder="name"
                    errors={errors.title}
                />
            </div>

            <div className={css.flex}>
                <div className={css.inner}>
                    <h4 className={css.title}>
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
                    <h4 className={css.title}>
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
                {!!categories?.length && (
                    <div className={css.inner}>
                        <h4 className={css.title}>
                            {trans('select_product_category')} <span className={css.red}>*</span>
                        </h4>
                        <div className={clsx(errors.category && css.errors)}>
                            <DropDown
                                data={categories}
                                defaultValue={value.category as IDropValue}
                                placeholder="select_category"
                                onChange={handleCategory}
                                withSub
                                white
                            />
                        </div>
                        {errors.category && <small className={css.errorsText}>{trans(errors.category)}</small>}
                    </div>
                )}

                <div className={css.inner}>
                    <h4 className={css.title}>
                        {trans('price')} {trans(value.currency?.slug?.toLowerCase() || 'uah')}/
                        {trans(value.rental_period?.slug?.toLowerCase() || 'day')}
                        <span className={css.red}>*</span>
                    </h4>
                    <Input
                        value={value.price || ''}
                        onChange={handleChange}
                        onBlur={validatePrice}
                        className={css.input}
                        name="price"
                        type="text"
                        placeholder="price"
                        errors={errors.price}
                    />
                </div>
            </div>

            <div className={css.flex}>
                <div className={css.inner}>
                    <h4 className={css.title}>
                        {trans('indicate_your_location')} <span className={css.red}>*</span>
                    </h4>
                    <Region className={css.region} error={errors.region} resetError={setErrors} />
                </div>
                <div className={css.inner}>
                    <h4 className={css.title}>{trans('amount_of_goods')}</h4>
                    <Tooltip content="for_renting_material_things">
                        <Input
                            value={value.items_amount || ''}
                            onChange={handleChange}
                            onBlur={validateAmount}
                            className={css.input}
                            name="items_amount"
                            type="text"
                            placeholder="amount"
                            errors={errors.price}
                        />
                    </Tooltip>
                </div>
            </div>

            <p>{trans('you_can_interrupt_filling_out_the_form')}</p>

            <div className={css.saveWrp}>
                <Tooltip content="all_your_changes_will_be_saved">
                    <button
                        type="button"
                        className={clsx(css.save, !(value.price || value.category || value.title) && css.disabled)}
                        onClick={handleSave}
                    >
                        <FontAwesomeIcon icon={faSave} />
                        <span>{trans('save_and_abort_filling')}</span>
                    </button>
                </Tooltip>
                <button type="button" className={css.btn} onClick={handleClear}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                    <span>{trans('clear')}</span>
                </button>
            </div>

            <div className={css.btnWrp}>
                <button type="submit" className={css.next}>
                    {trans('next')}
                </button>
            </div>
        </form>
    );
};

export default StepThree;
