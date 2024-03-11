import React from 'react';

import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { Switch, Collapse, NumberInput, EditIcon, Textarea, Text, TypographySize } from 'phoqer';
import { useTranslation } from 'react-i18next';

import { EditOfferForm } from 'src/pages/edit-offer/edit-offer.types';

import css from './sale.module.scss';

const DESCRIPTION_LENGTH = 250;

export const Sale = (): JSX.Element => {
    const { t } = useTranslation();
    const formik = useFormikContext<EditOfferForm>();

    const handlePercentage = (value: string): void => {
        const num = Number(value);
        if (num <= 100 && num >= 0) {
            formik.setFieldValue('sale.percentage', value);
        }
    };

    return (
        <>
            <Switch
                name="saleFlag"
                onChange={formik.handleChange}
                checked={formik.values.saleFlag}
                label={t('Add sales to your offer')}
            />

            <Collapse open={formik.values.saleFlag}>
                <div className={css.sale}>
                    <NumberInput
                        name="sale.percentage"
                        placeholder={'0.00%'}
                        onChange={handlePercentage}
                        value={formik.values.sale?.percentage}
                        className={classNames(css.input, css.percentage)}
                        leftIcon={<EditIcon className={css.icon} />}
                        error={formik.touched.sale && formik.errors.sale}
                    />
                    <Text as="small" size={TypographySize.SM} className={css.small}>
                        {t('Sale percentage (ex. 10%)')}
                    </Text>

                    <Textarea
                        className={css.textarea}
                        name="sale.description"
                        onChange={formik.handleChange}
                        value={formik.values.sale?.description}
                        maxLength={DESCRIPTION_LENGTH}
                        error={formik.touched.sale && formik.errors.sale}
                        placeholder={t('Sale description')}
                    />
                </div>
            </Collapse>
        </>
    );
};
