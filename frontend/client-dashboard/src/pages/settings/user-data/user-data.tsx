import React from 'react';

import classNames from 'classnames';
import { useFormik } from 'formik';
import { Input, Image, Button, SyncIcon, DeleteIcon, Tooltip } from 'phoqer';
import { UserType } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { useUserInfoContext } from 'src/context/user-info.context';
import { Cell } from 'src/pages/settings/common/cell/cell';
import { FormSchema } from 'src/pages/settings/user-data/user-data.utils';

import css from './user-data.module.scss';

export const UserData = (): JSX.Element => {
    const { t } = useTranslation();
    const { loading, user } = useUserInfoContext();

    const formik = useFormik<UserType>({
        initialValues: user,
        validationSchema: FormSchema,
        onSubmit: console.log,
    });

    if (loading) {
        return <Cell title={t('Your data')}>loading....</Cell>;
    }

    return (
        <Cell title={t('Your data')}>
            <div className={css.flex}>
                <div className={css.avatarWrp}>
                    <Image className={css.avatar} src={user.avatar as string} alt={user.firstName} />

                    <div className={css.avatarBtn}>
                        <Button>
                            {t('Change photo')}
                            <SyncIcon />
                        </Button>

                        <Tooltip label={t('Delete photo')}>
                            <Button format="link" aria-label={t('Delete photo')} onlyIcon>
                                <DeleteIcon />
                            </Button>
                        </Tooltip>
                    </div>
                </div>

                <form action="#" className={css.inner} onSubmit={formik.handleSubmit}>
                    <label className={classNames(css.block, css.mb)}>
                        <p className={css.label}>{t('First name')}</p>
                        <Input
                            type="text"
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            placeholder={t('First name')}
                            error={formik.errors.firstName && t(formik.errors.firstName)}
                        />
                    </label>

                    <label className={classNames(css.block, css.mb)}>
                        <p className={css.label}>{t('Last name')}</p>
                        <Input
                            type="text"
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            placeholder={t('Last name')}
                            error={formik.errors.lastName && t(formik.errors.lastName)}
                        />
                    </label>

                    <label className={classNames(css.block, css.mb)}>
                        <p className={css.label}>{t('Change your email')}</p>
                        <Input
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            placeholder={t('example@email.com')}
                            error={formik.errors.email && t(formik.errors.email)}
                        />
                    </label>

                    <div className={css.flex}>
                        <Button primary type="submit">
                            {t('Save changes')}
                        </Button>
                        <Button className={css.reset} onClick={formik.handleReset}>
                            {t('Reset from')}
                        </Button>
                    </div>
                </form>
            </div>
        </Cell>
    );
};
