import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { numberValidation } from '../../../../assets/helpers';
import { INewOffer, IState } from '../../../../interfaces';
import types from '../../../../redux/types';
import CheckTitle from '../../../Common/CheckTitle';
import { modal } from '../../../Common/Modal';
import SaveModal from '../SaveModal';
import useStyles from './StepTwo.styles';

interface IError {
    description?: string;
    deposit_val?: string;
    min_rent_value?: string;
    max_rent_value?: string;
}

const StepTwo = (): ReactElement => {
    const css = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();

    const [errors, setErrors] = useState<IError>({});
    const init = useSelector<IState, INewOffer>(state => state.newOffer);
    const [value, setValue] = useState<INewOffer>(init);

    useEffect(() => {
        if (!value.isDone.one) {
            router.push('/new_offer/1');
        }
    }, [value]);

    // OPTIONAL
    const handleDeposit = (deposit_val: boolean): void => {
        setErrors({});
        setValue({
            ...value,
            deposit_val: null,
            optional: { ...value.optional, deposit_val },
        });
    };
    const handleMin = (min_rent_value: boolean): void => {
        setErrors({});
        setValue({
            ...value,
            min_rent_value: null,
            optional: { ...value.optional, min_rent_value },
        });
    };
    const handleMax = (max_rent_value: boolean): void => {
        setErrors({});
        setValue({
            ...value,
            max_rent_value: null,
            optional: { ...value.optional, max_rent_value },
        });
    };

    // TYPING
    const handleNumber = (event: ChangeEvent<HTMLInputElement>): void => {
        setErrors({});
        if (numberValidation(event.target.value)) return;
        setValue({ ...value, [event.target.name]: event.target.value === '' ? null : +event.target.value });
    };
    const handleText = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setErrors({});
        setValue({ ...value, [event.target.name]: event.target.value });
    };
    const handleDocs = (doc_needed: boolean): void => {
        setValue({ ...value, doc_needed });
        setErrors({});
    };

    // SUBMISSION
    const handleBack = () => {
        dispatch({ type: types.NEW_OFFER_FORM, payload: { ...value, isDone: { ...value.isDone, two: false } } });
        router.push('/new_offer/1');
    };
    const handleClear = (): void => {
        const reset: INewOffer = {
            ...value,
            doc_needed: false,
            description: '',
            deposit_val: null,
            min_rent_value: null,
            max_rent_value: null,
            extra_requirements: '',
            optional: {
                deposit_val: false,
                min_rent_value: false,
                max_rent_value: false,
            },
            isDone: {
                one: true,
                two: false,
                three: false,
            },
        };
        setValue(reset);
        dispatch({ type: types.NEW_OFFER_FORM, payload: reset });
    };
    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();

        if (!value.description.trim()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setErrors({ description: 'Это обязательное поле' });
            dispatch({ type: types.NEW_OFFER_FORM, payload: { ...value, isDone: { ...value.isDone, two: false } } });
            return;
        }

        if (value.optional.deposit_val && !value.deposit_val) {
            setErrors({ deposit_val: 'Введите данные или отключите это поле' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            dispatch({ type: types.NEW_OFFER_FORM, payload: { ...value, isDone: { ...value.isDone, two: false } } });
            return;
        }

        if (value.optional.min_rent_value && !value.min_rent_value) {
            setErrors({ min_rent_value: 'Введите данные или отключите это поле' });
            window.scrollTo({ top: 200, behavior: 'smooth' });
            dispatch({ type: types.NEW_OFFER_FORM, payload: { ...value, isDone: { ...value.isDone, two: false } } });
            return;
        }

        if (value.optional.max_rent_value && !value.max_rent_value) {
            setErrors({ max_rent_value: 'Введите данные или отключите это поле' });
            dispatch({ type: types.NEW_OFFER_FORM, payload: { ...value, isDone: { ...value.isDone, two: false } } });
            return;
        }

        dispatch({ type: types.NEW_OFFER_FORM, payload: { ...value, isDone: { ...value.isDone, two: true } } });
        router.push('/new_offer/3');
    };
    const handleSave = (): void => {
        modal.open(<SaveModal />);
        dispatch({ type: types.NEW_OFFER_FORM, payload: value });
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <CheckTitle value={value.doc_needed} onChange={handleDocs}>
                Укажите нужно ли предоставить документы для оренды вашего товара
            </CheckTitle>

            <div className={css.inner}>
                <h4 className={css.title}>
                    Описание товара <span className={css.red}>*</span>
                </h4>
                <textarea
                    value={value.description}
                    onChange={handleText}
                    className={clsx(css.input, css.textarea, errors.description && css.errors)}
                    name="description"
                    placeholder="Описание"
                />
                {errors.description && <small className={css.errorsText}>{errors.description}</small>}
            </div>

            <div className={css.inner}>
                <CheckTitle value={value.optional.deposit_val} onChange={handleDeposit}>
                    {`Залоговая сума (${value.currency.name})`}
                </CheckTitle>
                <div className={clsx(css.inputWrp, value.optional.deposit_val || css.inactive)}>
                    <input
                        value={value.deposit_val !== null ? value.deposit_val : ''}
                        onChange={handleNumber}
                        className={clsx(css.input, errors.deposit_val && css.errors)}
                        name="deposit_val"
                        placeholder="Введите число"
                        readOnly={!value.optional.deposit_val}
                    />
                </div>
                {errors.deposit_val && <small className={css.errorsText}>{errors.deposit_val}</small>}
            </div>

            <div className={css.inner}>
                <CheckTitle value={value.optional.min_rent_value} onChange={handleMin}>
                    Минимальный срок аренды (часов)
                </CheckTitle>
                <div className={clsx(css.inputWrp, value.optional.min_rent_value || css.inactive)}>
                    <input
                        value={value.min_rent_value !== null ? value.min_rent_value : ''}
                        onChange={handleNumber}
                        className={clsx(css.input, errors.min_rent_value && css.errors)}
                        name="min_rent_value"
                        placeholder="Введите число"
                        readOnly={!value.optional.min_rent_value}
                    />
                </div>
                {errors.min_rent_value && <small className={css.errorsText}>{errors.min_rent_value}</small>}
            </div>

            <div className={css.inner}>
                <CheckTitle value={value.optional.max_rent_value} onChange={handleMax}>
                    Максимальный срок аренды (часов)
                </CheckTitle>
                <div className={clsx(css.inputWrp, value.optional.max_rent_value || css.inactive)}>
                    <input
                        value={value.max_rent_value !== null ? value.max_rent_value : ''}
                        onChange={handleNumber}
                        className={clsx(css.input, errors.max_rent_value && css.errors)}
                        name="max_rent_value"
                        placeholder="Введите число"
                        readOnly={!value.optional.max_rent_value}
                    />
                </div>
                {errors.max_rent_value && <small className={css.errorsText}>{errors.max_rent_value}</small>}
            </div>

            <div className={css.inner}>
                <h4 className={css.title}>Дополнительные требования</h4>
                <textarea
                    value={value.extra_requirements}
                    onChange={handleText}
                    className={clsx(css.input, css.textarea)}
                    name="extra_requirements"
                    placeholder="Дополнительно"
                />
            </div>

            <p>
                Вы можете прервать заполнение формы и продолжить в любое удобное время. Вся информация останется на своих местах
            </p>

            <div className={css.saveWrp}>
                <button type="button" className={css.save} onClick={handleSave}>
                    Сохранить и прервать заполение
                </button>
                <button type="button" className={css.btn} onClick={handleClear}>
                    Очистить форму
                </button>
            </div>

            <div className={css.btnWrp}>
                <button type="button" className={css.btn} onClick={handleBack}>
                    Назад
                </button>
                <button type="submit" className={css.next}>
                    Далее
                </button>
            </div>
        </form>
    );
};

export default StepTwo;
