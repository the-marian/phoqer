import React, { useEffect } from 'react';

import classNames from 'classnames';
import { useFormik } from 'formik';
import { Button, ChevronRightIcon, Container, Input, PlusIcon, ResetIcon, Text, Tooltip, useOpen } from 'phoqer';
import { Appear } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { CategoryItem } from 'src/components/category-item/category-item';
import { SubHeader } from 'src/components/sub-header/sub-header';
import { useNewOfferContext } from 'src/context/new-offer.context';
import { OfferParameters, Steps } from 'src/pages/new-offer/new-offer.types';
import { CategoryModal } from 'src/pages/new-offer/parameters/category-modal/category-modal';
import { ParametersSchema } from 'src/pages/new-offer/parameters/parameters.validation';
import { Actions } from 'src/pages/new-offer/shared/actions';
import { ErrorText } from 'src/pages/new-offer/shared/error-text';
import { Heading } from 'src/pages/new-offer/shared/heading';

import css from './parameters.module.scss';

type FormType = Omit<OfferParameters, 'price'> & { price: string | number };

export const Parameters = (): JSX.Element => {
    const { t } = useTranslation();
    const { open, onToggle } = useOpen();
    const { data, setData, setStep } = useNewOfferContext();

    const formik = useFormik<FormType>({
        initialValues: { price: data?.price },
        validationSchema: ParametersSchema,
        validate: () => {
            if (!data.category) {
                return { category: 'This is required field!' };
            }
        },
        onSubmit: values => {
            setStep(Steps.Images);
            setData({ ...values, price: formik.values.price });
        },
    });

    useEffect(() => {
        if (data.category && formik.errors.category) {
            formik.setFieldError('category', '');
        }
    }, [data.category, formik]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        const [int, float] = value.split(/\D/);

        if (!float) {
            formik.setFieldValue('price', value);
            return;
        }

        formik.setFieldValue('price', `${int}.${float.slice(0, 2)}`);
    };
    const handleReset = (): void => {
        setData({ category: undefined });
        formik.setFieldValue('price', '');
    };

    const handleSave = (): void => {
        setData({ price: formik.values.price || '' });
    };

    const goBack = (): void => {
        handleSave();
        setStep(Steps.Description);
    };

    return (
        <>
            <CategoryModal open={open} onClose={onToggle} />

            <SubHeader onBack={goBack}>
                <Actions onReset={handleReset} onSave={handleSave} />
            </SubHeader>

            <Appear key="Parameters">
                <Container className={css.root}>
                    <Heading
                        title={t('Great job!')}
                        description={t('Specify a category for your offer to make it easier for users to find it')}
                    />

                    <form action="#" method="POST" onSubmit={formik.handleSubmit}>
                        <div className={classNames(css.inner, css.mb)}>
                            <Text className={css.labelText}>{t('Select category for your offer')}</Text>
                            <button type="button" className={css.categoryBtn} onClick={onToggle}>
                                <Tooltip label={data.category ? t('Change category') : t('Select category')}>
                                    <div className={css.icon}>{data.category ? <ResetIcon /> : <PlusIcon />}</div>
                                </Tooltip>

                                <div className={css.category}>
                                    {data.category ? (
                                        <CategoryItem category={data.category} />
                                    ) : (
                                        <p>{t('Click to select category')}</p>
                                    )}
                                </div>
                            </button>
                            <ErrorText error={formik.errors.category || ''} />
                        </div>

                        <div className={classNames(css.inner, css.mb)}>
                            <label className={css.label}>
                                <Text className={css.labelText}>{t('Specify a price (per day)')}</Text>
                                <Input
                                    name="price"
                                    step="0.01"
                                    type="number"
                                    pattern="[0-9]+([\.,][0-9]+)?"
                                    value={formik.values.price}
                                    onChange={handleChange}
                                    error={formik.touched.price && formik.errors.price}
                                    placeholder={t('00.00 UAH')}
                                />
                            </label>
                        </div>

                        <div className={classNames(css.inner, css.flex)}>
                            <Button primary type="submit" disabled={Boolean(formik.errors.price || formik.errors.category)}>
                                {t('Next')}
                                <ChevronRightIcon />
                            </Button>
                        </div>
                    </form>
                </Container>
            </Appear>
        </>
    );
};
