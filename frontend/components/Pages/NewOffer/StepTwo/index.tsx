import { faSave, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';

import { moneyFormat, numberValidation } from '../../../../assets/helpers';
import routes from '../../../../assets/routes';
import { INewOffer, IState } from '../../../../interfaces';
import types from '../../../../redux/types';
import CheckTitle from '../../../Common/CheckTitle';
import CheckYesNo from '../../../Common/CheckYesNo';
import { modal } from '../../../Common/Modal';
import SaveModal from '../SaveModal';
import useStyles from './StepTwo.styles';

interface IError {
    description?: string;
    deposit_val?: string;
    min_rent_period?: string;
    max_rent_period?: string;
}

const StepTwo = (): ReactElement => {
    const css = useStyles();
    const history = useRouter();
    const dispatch = useDispatch();

    const [errors, setErrors] = useState<IError>({});
    const init = useSelector<IState, INewOffer>(state => state.offers.newOffer);
    const [value, setValue] = useState<INewOffer>(init);

    // OPTIONAL
    const handleDeposit = (deposit_val: boolean): void => {
        setErrors({});
        setValue({
            ...value,
            deposit_val: null,
            optional: { ...value.optional, deposit_val },
        });
    };
    const handleMin = (min_rent_period: boolean): void => {
        setErrors({});
        setValue({
            ...value,
            min_rent_period: null,
            optional: { ...value.optional, min_rent_period },
        });
    };
    const handleMax = (max_rent_period: boolean): void => {
        setErrors({});
        setValue({
            ...value,
            max_rent_period: null,
            optional: { ...value.optional, max_rent_period },
        });
    };

    // TYPING
    const handleNumber = (event: ChangeEvent<HTMLInputElement>): void => {
        setErrors({});
        const num = event.target.value.replace(/ /gi, '').trim();
        if (numberValidation(num)) return;
        setValue({ ...value, [event.target.name]: num === '' ? null : +num });
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
        history.push(routes.new_offer(1));
    };
    const handleClear = (): void => {
        const reset: INewOffer = {
            ...value,
            doc_needed: false,
            description: '',
            deposit_val: null,
            min_rent_period: null,
            max_rent_period: null,
            extra_requirements: '',
            optional: {
                deposit_val: false,
                min_rent_period: false,
                max_rent_period: false,
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

        if (value.optional.min_rent_period && !value.min_rent_period) {
            setErrors({ min_rent_period: 'Введите данные или отключите это поле' });
            window.scrollTo({ top: 200, behavior: 'smooth' });
            dispatch({ type: types.NEW_OFFER_FORM, payload: { ...value, isDone: { ...value.isDone, two: false } } });
            return;
        }

        if (value.optional.max_rent_period && !value.max_rent_period) {
            setErrors({ max_rent_period: 'Введите данные или отключите это поле' });
            dispatch({ type: types.NEW_OFFER_FORM, payload: { ...value, isDone: { ...value.isDone, two: false } } });
            return;
        }

        dispatch({ type: types.NEW_OFFER_FORM, payload: { ...value, isDone: { ...value.isDone, two: true } } });
        history.push(routes.new_offer(3));
    };
    const handleSave = (): void => {
        modal.open(<SaveModal />);
        dispatch({ type: types.NEW_OFFER_FORM, payload: value });
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <CheckYesNo value={value.doc_needed} onChange={handleDocs}>
                Укажите нужно ли предоставить документы для оренды вашего товара
            </CheckYesNo>

            <div className={css.inner}>
                <h4 className={css.title}>
                    Описание товара <span className={css.red}>*</span>
                </h4>
                <TextareaAutosize
                    cacheMeasurements
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
                    Залоговая сума (грн)
                </CheckTitle>
                <div className={clsx(css.inputWrp, value.optional.deposit_val || css.inactive)}>
                    <input
                        value={moneyFormat(value.deposit_val)}
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
                <CheckTitle value={value.optional.min_rent_period} onChange={handleMin}>
                    Минимальный срок аренды (дней)
                </CheckTitle>
                <div className={clsx(css.inputWrp, value.optional.min_rent_period || css.inactive)}>
                    <input
                        value={moneyFormat(value.min_rent_period)}
                        onChange={handleNumber}
                        className={clsx(css.input, errors.min_rent_period && css.errors)}
                        name="min_rent_period"
                        placeholder="Введите число"
                        readOnly={!value.optional.min_rent_period}
                    />
                </div>
                {errors.min_rent_period && <small className={css.errorsText}>{errors.min_rent_period}</small>}
            </div>

            <div className={css.inner}>
                <CheckTitle value={value.optional.max_rent_period} onChange={handleMax}>
                    Максимальный срок аренды (дней)
                </CheckTitle>
                <div className={clsx(css.inputWrp, value.optional.max_rent_period || css.inactive)}>
                    <input
                        value={moneyFormat(value.max_rent_period)}
                        onChange={handleNumber}
                        className={clsx(css.input, errors.max_rent_period && css.errors)}
                        name="max_rent_period"
                        placeholder="Введите число"
                        readOnly={!value.optional.max_rent_period}
                    />
                </div>
                {errors.max_rent_period && <small className={css.errorsText}>{errors.max_rent_period}</small>}
            </div>

            <div className={css.inner}>
                <h4 className={css.title}>Дополнительные требования</h4>
                <TextareaAutosize
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
                    <FontAwesomeIcon icon={faSave} />
                    <span>Сохранить и прервать заполение</span>
                </button>
                <button type="button" className={css.btn} onClick={handleClear}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                    <span>Очистить</span>
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
