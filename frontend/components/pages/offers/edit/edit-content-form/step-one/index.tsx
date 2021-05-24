import { faCompass } from '@fortawesome/free-regular-svg-icons/faCompass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { ChangeEvent, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { intNumberValidation, moneyFormat } from '../../../../../../assets/helpers';
import * as helpers from '../../../../../../assets/helpers';
import { ICategories, IDropValue, INewOffer, IState } from '../../../../../../interfaces';
import CheckYesNo from '../../../../../common/checkbox/check-yes-no';
import DropDown from '../../../../../common/drop-down';
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
    const data = useSelector<IState, ICategories[]>(state => state.categories);
    const categories = helpers.formatCatList(data);

    const handleChangeText = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setValue({ ...(value || {}), [event.target.name]: event.target.value });
        setErrors({});
    };
    const handleDelivery = (is_deliverable: boolean): void => {
        setValue({ ...value, is_deliverable });
        setErrors({});
    };
    const handleCategory = (category: IDropValue | null): void => {
        setValue({ ...value, category });
        setErrors({});
    };
    const handleNumber = (event: ChangeEvent<HTMLInputElement>): void => {
        setErrors({});
        const num = event.target.value.replace(/ /gi, '').trim();
        if (intNumberValidation(num)) return;
        setValue({ ...value, [event.target.name]: num === '' ? null : +num });
    };

    return (
        <>
            <h2 className={css.title} id="general">
                Основное
            </h2>
            <div className={css.inner}>
                <h3 className={css.subtitle}>
                    Название объявления <span className={css.red}>*</span>
                </h3>
                <Input
                    value={value.title || ''}
                    onChange={handleChangeText}
                    name="title"
                    type="text"
                    placeholder="Название"
                    errors={errors.title}
                />
            </div>
            <div className={css.inner}>
                <h3 className={css.subtitle}>
                    Укажите ваше местоположение <span className={css.red}>*</span>
                </h3>
                <button type="button" className={css.region}>
                    <FontAwesomeIcon icon={faCompass} />
                    <span>
                        Киев, Киевская область Киев, Киевская область Киев, Киевская область Киев, Киевская область Киев, Киевская
                        область
                    </span>
                </button>
            </div>
            <CheckYesNo value={value.is_deliverable} onChange={handleDelivery}>
                Укажите возможность доставки вашего товара в другой город
            </CheckYesNo>
            <div className={css.flex}>
                {!!categories.length && (
                    <div className={css.inner}>
                        <h3 className={css.subtitle}>
                            Выберите категорию товара <span className={css.red}>*</span>
                        </h3>
                        <div className={clsx(errors.category && css.errors)}>
                            <DropDown
                                data={categories}
                                defaultValue={value.category}
                                placeholder="Выберите категорию"
                                onChange={handleCategory}
                                withSub
                            />
                        </div>
                        {errors.category && <small className={css.errorsText}>{errors.category}</small>}
                    </div>
                )}
                <div className={css.inner}>
                    <h3 className={css.subtitle}>
                        Цена (грн/день) <span className={css.red}>*</span>
                    </h3>
                    <Input
                        value={moneyFormat(value.price || 0)}
                        onChange={handleNumber}
                        type="text"
                        placeholder="Цена"
                        name="price"
                        errors={errors.price}
                    />
                </div>
            </div>
        </>
    );
};

export default StepOne;
