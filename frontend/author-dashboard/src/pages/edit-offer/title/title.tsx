import React from 'react';

import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { EditIcon, Input, Text, TypographySize } from 'phoqer';
import { useTranslation } from 'react-i18next';

import { EditOfferForm } from 'src/pages/edit-offer/edit-offer.types';

import css from './title.module.scss';

const MAX_LENGTH = 60;

export const Title = (): JSX.Element => {
    const { t } = useTranslation();
    const formik = useFormikContext<EditOfferForm>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.value.length > MAX_LENGTH) {
            formik.setFieldValue('title', event.target.value.slice(0, MAX_LENGTH));
            return;
        }

        formik.setFieldValue('title', event.target.value);
    };

    return (
        <div className={css.inner}>
            <Input
                name="title"
                value={formik.values.title}
                onChange={handleChange}
                className={classNames(css.input, css.titleInput)}
                leftIcon={<EditIcon className={css.icon} />}
                error={formik.touched.title && formik.errors.title}
                placeholder={t('Start typing here ...')}
            />

            <Text size={TypographySize.SM} as="small" className={css.small}>
                {t('Maximum length: ')}
                {formik.values.title.length} / {MAX_LENGTH}
            </Text>
        </div>
    );
};
