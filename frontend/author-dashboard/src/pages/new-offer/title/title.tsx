import React from 'react';

import classNames from 'classnames';
import { useFormik } from 'formik';
import { Container, Textarea, Button, ChevronRightIcon, Text } from 'phoqer';
import { Appear } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { SubHeader } from 'src/components/sub-header/sub-header';
import { useNewOfferContext } from 'src/context/new-offer.context';
import { useNavigate } from 'src/hook/navigate.hook';
import { OfferTitle, Steps } from 'src/pages/new-offer/new-offer.types';
import { Actions } from 'src/pages/new-offer/shared/actions';
import { Heading } from 'src/pages/new-offer/shared/heading';
import { TitleSchema } from 'src/pages/new-offer/title/title.validation';

import css from './title.module.scss';

export const Title = (): JSX.Element => {
    const { t } = useTranslation();
    const navigation = useNavigate();

    const { data, setData, setStep } = useNewOfferContext();

    const formik = useFormik<OfferTitle>({
        initialValues: { title: data?.title || '' },
        validationSchema: TitleSchema,
        onSubmit: values => {
            setStep(Steps.Description);
            setData(values);
        },
    });

    const handleReset = (): void => {
        setData({ title: '' });
        formik.setFieldValue('title', '');
    };

    const handleSave = (): void => {
        setData(formik.values);
    };

    const goBack = (): void => {
        setData(formik.values);
        navigation('/author');
    };

    return (
        <>
            <SubHeader onBack={goBack}>
                <Actions onReset={handleReset} onSave={handleSave} />
            </SubHeader>

            <Appear key="Title">
                <Container className={css.root}>
                    <Heading
                        title={t('Start now')}
                        description={t(
                            'Create a title for your offer that will describe your offer. The title should contain keywords that people can find your offer.',
                        )}
                    />

                    <form action="#" method="POST" onSubmit={formik.handleSubmit}>
                        <div className={classNames(css.inner, css.mb)}>
                            <label className={css.label}>
                                <Text className={css.labelText}>{t('Create offer title')}</Text>
                                <Textarea
                                    filled
                                    name="title"
                                    maxLength={60}
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    error={formik.touched.title && formik.errors.title}
                                    placeholder={t('Start typing here ...')}
                                />
                            </label>
                        </div>

                        <div className={classNames(css.inner, css.flex)}>
                            <Button primary type="submit" disabled={!formik.values.title}>
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
