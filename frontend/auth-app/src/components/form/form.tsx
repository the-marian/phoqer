import React, { useCallback, useState } from 'react';

import classNames from 'classnames';
import { FormikErrors, useFormik } from 'formik';
import { nanoid } from 'nanoid';
import { ArrowLeftIcon, ArrowRightIcon, Button, Collapse, Flex, Input, Loader, Text, toast } from 'phoqer';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { AuthFormType, FormStep, FormType } from 'src/components/form/type';
import { AuthSchema } from 'src/components/form/validation';
import { TOKEN_KEY } from 'src/constants/auth.constants';
import { COMMON_ERROR_TEXT, COMMON_ERROR_TITLE } from 'src/constants/error.constants';
import { TOAST_SM_TIMEOUT } from 'src/constants/toast.constants';
import { http } from 'src/http/http';
import { AuthResponse } from 'src/types/auth.type';

import css from './form.module.scss';

const initialValues: AuthFormType = {
    step: FormStep.One,
    type: FormType.LogIn,

    email: '',
    password: '',
    firstName: '',
    lastName: '',
};

export const Form = (): JSX.Element => {
    const { t } = useTranslation();
    const { hash } = useLocation();
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik<AuthFormType>({
        initialValues: { ...initialValues, type: hash === FormType.LogIn ? FormType.LogIn : FormType.SignUp },
        validationSchema: AuthSchema,
        onSubmit: async (values: AuthFormType): Promise<void> => {
            try {
                setIsLoading(true);
                const url = values.type === FormType.LogIn ? '/auth/login' : '/auth/join';
                const { data } = await http.post<AuthResponse>(url, values);
                localStorage.setItem(TOKEN_KEY, data.token);

                window.location.reload();
            } catch {
                setIsLoading(false);
                toast.error({
                    id: nanoid(),
                    title: t(COMMON_ERROR_TITLE),
                    content: t(COMMON_ERROR_TEXT),
                    timeout: TOAST_SM_TIMEOUT,
                    button: {
                        close: {
                            label: t('Close'),
                        },
                    },
                });
            }
        },
    });
    const { errors, touched, setFieldValue, handleChange, handleSubmit, resetForm, validateForm, setFieldTouched } = formik;
    const { step, type, email, password, firstName, lastName } = formik.values;

    const returnToEmail = useCallback((): void => {
        setFieldValue('step', FormStep.One);
    }, [setFieldValue]);

    const goToPassword = useCallback((): void => {
        validateForm().then((error: FormikErrors<AuthFormType>): void => {
            if (error.email) {
                setFieldTouched('email', true, true);
                return;
            }

            setFieldValue('step', FormStep.Two);
        });
    }, [validateForm, setFieldValue, setFieldTouched]);

    const createAccount = useCallback((): void => {
        validateForm().then((error: FormikErrors<AuthFormType>): void => {
            if (error.password) {
                setFieldTouched('password', true, true);
                return;
            }

            setFieldValue('type', FormType.SignUp);
            setFieldValue('step', FormStep.Three);
        });
    }, [validateForm, setFieldValue, setFieldTouched]);

    const logIn = useCallback((): void => {
        setFieldValue('type', FormType.LogIn);
        validateForm().then(() => handleSubmit());
    }, [setFieldValue, handleSubmit, validateForm]);

    const emailError = touched.email && errors.email && t(errors.email);
    const passwordError = touched.password && errors.password && t(errors.password);
    const firstNameError = touched.firstName && errors.firstName && t(errors.firstName);
    const lastNameError = touched.lastName && errors.lastName && t(errors.lastName);

    return (
        <form action="#" className={css.mt} onSubmit={handleSubmit}>
            <Collapse open={step === FormStep.One}>
                <label htmlFor="email" className={css.label}>
                    <Flex justify="between" align="center">
                        <Text className={css.labelText}>{t('Enter your email')}</Text>
                        <button type="button" className={css.link} onClick={() => resetForm()}>
                            <Text>{t('Reset')}</Text>
                        </button>
                    </Flex>

                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t('Email')}
                        autoComplete="email"
                        error={emailError}
                        value={email}
                        onChange={handleChange}
                        className={css.input}
                    />
                </label>
            </Collapse>

            <Collapse open={step !== FormStep.One}>
                <button type="button" onClick={returnToEmail} className={css.emailBtn}>
                    <ArrowLeftIcon />
                    <Text>{email}</Text>
                </button>
            </Collapse>

            <Collapse open={step === FormStep.Two}>
                <label className={classNames(css.label, css.mt)}>
                    <Flex justify="between" align="center">
                        <Text className={css.labelText}>{t('Enter your password')}</Text>
                        <Link className={css.link} to="#forgot">
                            <Text>{t('Forgot password?')}</Text>
                        </Link>
                    </Flex>
                    <Input
                        name="password"
                        type="password"
                        placeholder={t('Password')}
                        autoComplete="password"
                        error={passwordError}
                        value={password}
                        onChange={handleChange}
                        className={css.input}
                    />
                </label>
            </Collapse>

            <Collapse open={type === FormType.SignUp && step === FormStep.Three}>
                <label className={classNames(css.label, css.mt)}>
                    <Text className={css.labelText}>{t('What is your name?')}</Text>
                    <Input
                        name="firstName"
                        placeholder={t('First name')}
                        value={firstName}
                        onChange={handleChange}
                        error={firstNameError}
                        autoComplete="given-name"
                        className={css.input}
                    />
                </label>

                <label className={classNames(css.label, css.mt)}>
                    <Text className={css.labelText}>{t('Your last name')}</Text>
                    <Input
                        name="lastName"
                        placeholder={t('Last name')}
                        value={lastName}
                        onChange={handleChange}
                        error={lastNameError}
                        autoComplete="family-name"
                        className={css.input}
                    />
                </label>
            </Collapse>

            <Flex className={css.mt} align="center" justify="center">
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        {step === FormStep.One && (
                            <Button primary onClick={goToPassword}>
                                {t('Continue')}
                                <ArrowRightIcon />
                            </Button>
                        )}

                        {step === FormStep.Two && (
                            <>
                                {type === FormType.LogIn && (
                                    <>
                                        <button type="button" className={classNames(css.mr, css.link)} onClick={createAccount}>
                                            <Text>{t('Create new account ?')}</Text>
                                        </button>
                                        <Button primary type="submit">
                                            {t('Log In')}
                                            <ArrowRightIcon />
                                        </Button>
                                    </>
                                )}

                                {type === FormType.SignUp && (
                                    <>
                                        <button type="button" onClick={logIn} className={classNames(css.mr, css.link)}>
                                            <Text>{t('Log In to your account ?')}</Text>
                                        </button>
                                        <Button primary onClick={createAccount}>
                                            {t('Continue')}
                                            <ArrowRightIcon />
                                        </Button>
                                    </>
                                )}
                            </>
                        )}

                        {step === FormStep.Three && (
                            <Button primary type="submit">
                                {t('Sign Up')}
                                <ArrowRightIcon />
                            </Button>
                        )}
                    </>
                )}
            </Flex>
        </form>
    );
};
