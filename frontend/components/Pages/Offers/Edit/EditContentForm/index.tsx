import React, { FormEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { IDropValue, INewOffer, IOfferCard, IState } from '../../../../../interfaces';
import initState from '../../../../../redux/state';
import Button from '../../../../Common/Button';
import editOfferTemplate from './index.style';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

const useStyles = createUseStyles(editOfferTemplate);

const newOfferAdapter = (value: IOfferCard | null): INewOffer =>
    value
        ? {
              ...initState.offers.new_offer,

              title: value.title || '',
              price: value.price || 0,
              category: value.category ? ({ name: value.category_name, slug: value.category, type: 'main' } as IDropValue) : null,
              sub_category: value.sub_category
                  ? ({ name: value.sub_category_name, slug: value.sub_category, type: 'sub' } as IDropValue)
                  : null,
              is_deliverable: value.is_deliverable,

              doc_needed: value.doc_needed,
              description: value.description,
              deposit_val: value.deposit_val || null,
              min_rent_period: value.min_rent_period || 0,
              max_rent_period: value.max_rent_period || 0,
              extra_requirements: value.extra_requirements || '',
              optional: {
                  deposit_val: !!value.deposit_val,
                  min_rent_period: !!value.min_rent_period,
                  max_rent_period: !!value.max_rent_period,
              },
          }
        : initState.offers.new_offer;

export interface IError {
    title?: string;
    price?: string;
    category?: string;
    description?: string;
    deposit_val?: string;
    min_rent_period?: string;
    max_rent_period?: string;
    extra_requirements?: string;
}

const EditContentForm = (): ReactElement => {
    const css = useStyles();

    const init = useSelector<IState, IOfferCard | null>(state => state.offers.single);
    const [value, setValue] = useState<INewOffer>(newOfferAdapter(init));
    const [errors, setErrors] = useState<IError>({});

    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();

        // check if field is empty
        if (!value.title.trim()) {
            setErrors({ title: 'Это обязательное поле' });
            window.scrollTo({
                top: (document.getElementById('general')?.offsetTop || 300) - 100,
                behavior: 'smooth',
            });
            return;
        }
        if (!value.category) {
            setErrors({ category: 'Это обязательное поле' });
            window.scrollTo({
                top: (document.getElementById('general')?.offsetTop || 300) - 100,
                behavior: 'smooth',
            });
            return;
        }
        if (!value.price) {
            setErrors({ price: 'Это обязательное поле' });
            window.scrollTo({
                top: (document.getElementById('general')?.offsetTop || 300) - 100,
                behavior: 'smooth',
            });
            return;
        }
        if (!value.description.trim()) {
            setErrors({ description: 'Это обязательное поле' });
            window.scrollTo({
                top: (document.getElementById('description')?.offsetTop || 300) - 100,
                behavior: 'smooth',
            });
            return;
        }

        // check optional fields
        if (value.optional.deposit_val && !value.deposit_val) {
            setErrors({ deposit_val: 'Введите данные или отключите это поле' });
            return;
        }
        if (value.optional.min_rent_period && !value.min_rent_period) {
            setErrors({ min_rent_period: 'Введите данные или отключите это поле' });
            return;
        }
        if (value.optional.max_rent_period && !value.max_rent_period) {
            setErrors({ max_rent_period: 'Введите данные или отключите это поле' });
            return;
        }

        console.log(value.price);
    };

    return (
        <form action="#" method="post" onSubmit={handleSubmit}>
            <StepOne value={value} setValue={setValue} errors={errors} setErrors={setErrors} />

            <StepTwo value={value} setValue={setValue} errors={errors} setErrors={setErrors} />

            <p className={css.mark}>
                <span className={css.red}>*</span> Обязательные поля
            </p>

            <Button className={css.submit} type="submit">
                Опубликувать
            </Button>
        </form>
    );
};

export default EditContentForm;
