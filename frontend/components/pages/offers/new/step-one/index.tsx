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
import { intNumberValidation, moneyFormat } from '../../../../../assets/helpers';
import routes from '../../../../../assets/routes';
import { Theme } from '../../../../../assets/theme';
import useTrans from '../../../../../hooks/trans.hook';
import { ICategories, IDropValue, INewOffer, IState } from '../../../../../interfaces';
import types from '../../../../../redux/types';
import CheckYesNo from '../../../../common/checkbox/check-yes-no';
import DropDown from '../../../../common/drop-down';
import Input from '../../../../common/input';
import Region from '../../../../common/region';
import newOfferTemplate from '../new-offer.style';

const useStyles = createUseStyles((theme: Theme) => newOfferTemplate(theme).step);

interface IError {
    title?: string;
    price?: string;
    category?: string;
}

const notDone = (value: INewOffer, dispatch: Dispatch): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch({ type: types.NEW_OFFER_FORM, payload: { ...value, isDone: { ...value.isDone, one: false } } });
};

const StepThree = (): ReactElement => {
    const css = useStyles();
    const history = useRouter();
    const trans = useTrans();
    const dispatch = useDispatch();

    const [errors, setErrors] = useState<IError>({});
    const init = useSelector<IState, INewOffer>(state => state.offers.new_offer);
    const [value, setValue] = useState<INewOffer>(init);

    // categories
    const data = useSelector<IState, ICategories[]>(state => state.categories);
    const categories = helpers.formatCatList(data);

    // event handlers
    const handleDelivery = (is_deliverable: boolean): void => {
        setValue({ ...value, is_deliverable });
    };
    const handleTitle = (event: ChangeEvent<HTMLInputElement>): void => {
        setValue({ ...value, title: event.target.value });
        setErrors({});
    };
    const handlePrice = (event: ChangeEvent<HTMLInputElement>): void => {
        const price = event.target.value.replace(/ /gi, '').trim();
        if (intNumberValidation(price)) return;
        setValue({ ...value, price: price === '' ? null : +price });
        setErrors({});
    };
    const handleCategory = (category: IDropValue | null): void => {
        setValue({ ...value, category });
        setErrors({});
    };

    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();

        if (!value.title.trim()) {
            setErrors({ title: 'required_field' });
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
            is_deliverable: false,
            price: null,
            category: null,
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
            callback() {
                history.push(routes.offers.new('draft'), undefined, { shallow: true });
            },
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
                    onChange={handleTitle}
                    className={css.input}
                    name="name"
                    type="text"
                    placeholder={trans('name')}
                    errors={errors.title}
                />
            </div>

            <div className={css.inner}>
                <h4 className={css.title}>
                    {trans('indicate_your_location')} <span className={css.red}>*</span>
                </h4>
                <Region />
            </div>

            <CheckYesNo value={value.is_deliverable} onChange={handleDelivery}>
                {trans('indicate_possibility_of_delivery')}
            </CheckYesNo>

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
                                placeholder={trans('select_category')}
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
                        {trans('price')} (грн/день) <span className={css.red}>*</span>
                    </h4>
                    <Input
                        value={moneyFormat(value.price || 0)}
                        onChange={handlePrice}
                        className={css.input}
                        type="text"
                        placeholder={trans('price')}
                        errors={errors.price}
                    />
                </div>
            </div>

            <p>{trans('you_can_interrupt_filling_out_the_form')}</p>

            <div className={css.saveWrp}>
                <button
                    type="button"
                    className={clsx(css.save, !(value.price || value.category || value.title) && css.disabled)}
                    onClick={handleSave}
                >
                    <FontAwesomeIcon icon={faSave} />
                    <span>{trans('save_and_abort_filling')}</span>
                </button>
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
