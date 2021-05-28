import clsx from 'clsx';
import React, { ChangeEvent, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import TextareaAutosize from 'react-textarea-autosize';

import { intNumberValidation, moneyFormat } from '../../../../../../assets/helpers';
import { INewOffer } from '../../../../../../interfaces';
import CheckTitle from '../../../../../common/checkbox/check-title';
import CheckYesNo from '../../../../../common/checkbox/check-yes-no';
import Input from '../../../../../common/input';
import { IError } from '../';
import editOfferTemplate from '../edit-content-form.style';

const useStyles = createUseStyles(editOfferTemplate);

interface IProps {
    value: INewOffer;
    errors: IError;
    setValue: (value: INewOffer) => void;
    setErrors: (error: IError) => void;
}

const StepOne = ({ value, errors, setErrors, setValue }: IProps): ReactElement => {
    const css = useStyles();

    const handleChangeText = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setValue({ ...(value || {}), [event.target.name]: event.target.value });
        setErrors({});
    };
    const handleDocs = (doc_needed: boolean): void => {
        setValue({ ...value, doc_needed });
        setErrors({});
    };
    const handleNumber = (event: ChangeEvent<HTMLInputElement>): void => {
        setErrors({});
        const num = event.target.value.replace(/ /gi, '').trim();
        if (intNumberValidation(num)) return;
        setValue({ ...value, [event.target.name]: num === '' ? null : +num });
    };
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

    return (
        <>
            <h2 className={css.title} id="description">
                Описание
            </h2>
            <CheckYesNo value={value.doc_needed} onChange={handleDocs}>
                Укажите нужно ли предоставить документы для оренды вашего товара
            </CheckYesNo>
            <div className={css.inner}>
                <h3 className={css.subtitle}>
                    Описание товара <span className={css.red}>*</span>
                </h3>
                <TextareaAutosize
                    cacheMeasurements
                    value={value?.description}
                    onChange={handleChangeText}
                    wrap="soft"
                    className={clsx(css.textarea, errors.description && css.errors)}
                    name="description"
                    placeholder="Описание"
                />
                {errors.description && <small className={css.errorsText}>{errors.description}</small>}
            </div>
            <div className={css.inner}>
                <CheckTitle value={value.optional.deposit_val} onChange={handleDeposit}>
                    Залоговая сума (грн)
                </CheckTitle>
                <div className={clsx(css.group, value.optional.deposit_val || css.inactive)}>
                    <Input
                        value={moneyFormat(value.deposit_val || 0)}
                        onChange={handleNumber}
                        name="deposit_val"
                        placeholder="Введите число"
                        readOnly={!value.optional.deposit_val}
                        errors={errors.deposit_val}
                    />
                </div>
            </div>
            <div className={css.inner}>
                <CheckTitle value={value.optional.min_rent_period} onChange={handleMin}>
                    Минимальный срок аренды (дней)
                </CheckTitle>
                <div className={clsx(css.group, value.optional.min_rent_period || css.inactive)}>
                    <Input
                        value={moneyFormat(value.min_rent_period || 0)}
                        onChange={handleNumber}
                        name="min_rent_period"
                        placeholder="Введите число"
                        readOnly={!value.optional.min_rent_period}
                        errors={errors.min_rent_period}
                    />
                </div>
                {errors.min_rent_period && <small className={css.errorsText}>{errors.min_rent_period}</small>}
            </div>
            <div className={css.inner}>
                <CheckTitle value={value.optional.max_rent_period} onChange={handleMax}>
                    Максимальный срок аренды (дней)
                </CheckTitle>
                <div className={clsx(css.group, value.optional.max_rent_period || css.inactive)}>
                    <Input
                        value={moneyFormat(value.max_rent_period || 0)}
                        onChange={handleNumber}
                        name="max_rent_period"
                        placeholder="Введите число"
                        readOnly={!value.optional.max_rent_period}
                        errors={errors.max_rent_period}
                    />
                </div>
            </div>
            <div className={css.inner}>
                <h3 className={css.subtitle}>Дополнительные требования</h3>
                <TextareaAutosize
                    value={value.extra_requirements}
                    onChange={handleChangeText}
                    wrap="soft"
                    className={css.textarea}
                    name="extra_requirements"
                    placeholder="Дополнительно"
                />
            </div>
        </>
    );
};

export default StepOne;
