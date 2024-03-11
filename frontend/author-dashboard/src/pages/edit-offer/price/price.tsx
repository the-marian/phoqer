import React from 'react';

import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { EditIcon, NumberInput, Text, TypographySize } from 'phoqer';
import { useTranslation } from 'react-i18next';

import { EditOfferForm } from 'src/pages/edit-offer/edit-offer.types';

import css from './price.module.scss';

export const Price = (): JSX.Element => {
    const { t } = useTranslation();
    const formik = useFormikContext<EditOfferForm>();
    const handleChange = (value: string): void => formik.setFieldValue('price', value);

    return (
        <div className={css.inner}>
            <NumberInput
                name="price"
                className={classNames(css.input, css.priceInput)}
                value={formik.values.price}
                onChange={handleChange}
                leftIcon={<EditIcon className={css.icon} />}
                error={formik.touched.price && formik.errors.price}
                placeholder={t('00.00 UAH')}
            />

            <Text as="small" size={TypographySize.SM} className={css.small}>
                {t('UAH per day')}
            </Text>
        </div>
    );
};
