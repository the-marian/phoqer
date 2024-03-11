import React from 'react';

import { useFormik } from 'formik';
import { LargeModal, LargeModalHeader, Input, Link, Button } from 'phoqer';
import { useTranslation } from 'react-i18next';

import { useLinkClick } from 'src/hook/link-click.hook';

import css from './change-password.module.scss';
import { FormSchema, FormValue, initialValues } from './change-password.utils';

interface Props {
    open: boolean;
    onClose: () => void;
}
const ChangePassword = ({ open, onClose }: Props): JSX.Element => {
    const { t, i18n } = useTranslation();
    const handleClick = useLinkClick();

    const { values, errors, handleChange, handleSubmit, handleReset } = useFormik<FormValue>({
        initialValues,
        validationSchema: FormSchema,
        onSubmit: console.log,
    });

    const isConfirm = values.newPassword !== values.confirmPassword && t('Passwords do not match');

    return (
        <LargeModal open={open} onClose={onClose} header={<LargeModalHeader title={t('Back to settings')} onClose={onClose} />}>
            <form action="#" className={css.form} onSubmit={handleSubmit}>
                <label className={css.label}>
                    <p className={css.text}>{t('Enter your old password')}</p>
                    <Input
                        autoFocus
                        type="password"
                        name="oldPassword"
                        placeholder="******"
                        onChange={handleChange}
                        value={values.oldPassword}
                        error={errors.oldPassword && t(errors.oldPassword)}
                    />
                </label>

                <Link className={css.link} href={`/${i18n.language}/auth/login`} onClick={handleClick}>
                    {t("Don't remember your old password?")}
                </Link>

                <label className={css.label}>
                    <p className={css.text}>{t('Enter a new password')}</p>
                    <Input
                        type="password"
                        name="newPassword"
                        placeholder="******"
                        onChange={handleChange}
                        value={values.newPassword}
                        error={errors.newPassword && t(errors.newPassword)}
                    />
                </label>

                <label className={css.label}>
                    <p className={css.text}>{t('Confirm password')}</p>
                    <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="******"
                        onChange={handleChange}
                        value={values.confirmPassword}
                        error={(errors.confirmPassword && t(errors.confirmPassword)) || isConfirm}
                    />
                </label>

                <div className={css.footer}>
                    <Button onClick={handleReset}>{t('Reset form')}</Button>

                    <Button type="submit" primary>
                        {t('Change password')}
                    </Button>
                </div>
            </form>
        </LargeModal>
    );
};

export default ChangePassword;
