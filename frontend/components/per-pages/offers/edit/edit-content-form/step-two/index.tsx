import clsx from 'clsx';
import React, { ChangeEvent, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import TextareaAutosize from 'react-textarea-autosize';

import useTrans from '../../../../../../hooks/trans.hook';
import { INewOffer } from '../../../../../../interfaces';
import { numberValidation } from '../../../../../../utils/helpers';
import CheckTitle from '../../../../../common/checkbox/check-title';
import CheckYesNo from '../../../../../common/checkbox/check-yes-no';
import Input from '../../../../../common/input';
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

const StepOne = ({ value, errors, setErrors, setValue }: IProps): ReactElement => {
    const css = useStyles();
    const trans = useTrans();

    const handleChangeText = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setValue({ ...(value || {}), [event.target.name]: event.target.value });
        setErrors({});
    };
    const handleDocs = (doc_needed: boolean): void => {
        setValue({ ...value, doc_needed });
        setErrors({});
    };
    const validateNumber = (event: ChangeEvent<HTMLInputElement>): void => {
        const name = event.target.name as 'deposit_val' | 'min_rent_period' | 'max_rent_period';
        const num = value[name];
        if (numberValidation(String(num))) return setValue({ ...value, [name]: null });
        setValue({ ...value, [name]: num ? Math.round(+num * 100) / 100 : null });
        setErrors({});
    };
    const handleNumber = (event: ChangeEvent<HTMLInputElement>): void => {
        const num = event.target.value;
        setValue({ ...value, [event.target.name]: num ? num : null });
        setErrors({});
    };
    const handleDelivery = (is_deliverable: boolean): void => {
        setValue({ ...value, is_deliverable });
        setErrors({});
    };

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

    return (
        <>
            <h2 className={css.title} id="description">
                {trans('description')}
            </h2>

            <CheckYesNo value={value.doc_needed} onChange={handleDocs}>
                {trans('indicate_whether_you_need_provide_documents')}
            </CheckYesNo>

            <CheckYesNo value={value.is_deliverable} onChange={handleDelivery}>
                {trans('indicate_possibility_of_delivery')}
            </CheckYesNo>

            <div className={css.inner}>
                <h4 className={css.title}>
                    {trans('product_description')} <span className={css.red}>*</span>
                </h4>
                <TextareaAutosize
                    cacheMeasurements
                    value={value.description}
                    onChange={handleChangeText}
                    wrap="soft"
                    className={clsx(css.textarea, errors.description && css.errors)}
                    name="description"
                    placeholder={trans('description')}
                />
                {errors.description && <small className={css.errorsText}>{trans(errors.description)}</small>}
            </div>

            <div className={css.flex}>
                <div className={css.inner}>
                    <CheckTitle value={value.optional.min_rent_period} onChange={handleMin}>
                        <>
                            {trans('minimum_rental_period')} ({trans(value.rental_period?.slug.toLowerCase() || 'day')})
                        </>
                    </CheckTitle>
                    <div className={clsx(css.group, value.optional.min_rent_period || css.inactive)}>
                        <Input
                            value={value.min_rent_period || ''}
                            onChange={handleNumber}
                            onBlur={validateNumber}
                            name="min_rent_period"
                            placeholder={trans('enter_the_number')}
                            readOnly={!value.optional.min_rent_period}
                            errors={errors.min_rent_period}
                        />
                    </div>
                    {errors.min_rent_period && <small className={css.errorsText}>{errors.min_rent_period}</small>}
                </div>
                <div className={css.inner}>
                    <CheckTitle value={value.optional.max_rent_period} onChange={handleMax}>
                        <>
                            {trans('maximum_rental_period')} ({trans(value.rental_period?.slug.toLowerCase() || 'day')})
                        </>
                    </CheckTitle>
                    <div className={clsx(css.group, value.optional.max_rent_period || css.inactive)}>
                        <Input
                            value={value.max_rent_period || ''}
                            onChange={handleNumber}
                            onBlur={validateNumber}
                            name="max_rent_period"
                            placeholder={trans('enter_the_number')}
                            readOnly={!value.optional.max_rent_period}
                            errors={errors.max_rent_period}
                        />
                    </div>
                </div>
            </div>

            <div className={css.inner}>
                <CheckTitle value={value.optional.deposit_val} onChange={handleDeposit}>
                    <>
                        {trans('deposit')} ({trans(value.currency?.slug.toLowerCase() || 'uah')})
                    </>
                </CheckTitle>
                <div className={clsx(css.group, value.optional.deposit_val || css.inactive)}>
                    <Input
                        value={value.deposit_val || ''}
                        onChange={handleNumber}
                        onBlur={validateNumber}
                        name="deposit_val"
                        placeholder={trans('enter_the_number')}
                        readOnly={!value.optional.deposit_val}
                        errors={errors.deposit_val}
                    />
                </div>
            </div>

            <div className={css.inner}>
                <h4 className={css.subtitle}>{trans('additional_requirements')}</h4>
                <Tooltip content="you_can_indicate_here_extra_requirements">
                    <TextareaAutosize
                        value={value.extra_requirements}
                        onChange={handleChangeText}
                        wrap="soft"
                        className={css.textarea}
                        name="extra_requirements"
                        placeholder={trans('additionally')}
                    />
                </Tooltip>
            </div>
        </>
    );
};

export default StepOne;
