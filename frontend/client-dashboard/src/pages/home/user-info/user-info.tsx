import React from 'react';

import { Image, Link, EditIcon } from 'phoqer';
import { useTranslation } from 'react-i18next';

import { useUserInfoContext } from 'src/context/user-info.context';
import { useLinkClick } from 'src/hook/link-click.hook';
import { UserInfoLoader } from 'src/pages/home/user-info/user-info-loader';

import css from './user-info.module.scss';

export const UserInfo = (): JSX.Element => {
    const { t, i18n } = useTranslation();
    const { loading, user } = useUserInfoContext();
    const handleClick = useLinkClick();

    if (loading) {
        return <UserInfoLoader />;
    }

    const userName = `${user.firstName} ${user.lastName}`;

    return (
        <div className={css.root}>
            <Image className={css.image} src={user.avatar || '/avatar.svg'} alt={userName} />

            <div>
                <h3 className={css.title}>
                    {t('Your account information')}
                    <Link
                        onlyIcon
                        format="link"
                        className={css.btn}
                        onClick={handleClick}
                        href={`/${i18n.language}/client/settings`}
                    >
                        <EditIcon />
                    </Link>
                </h3>

                <table className={css.table}>
                    <tbody>
                        <tr>
                            <td>{t('Fist Name')}</td>
                            <td>{user.firstName}</td>
                        </tr>
                        <tr>
                            <td>{t('Last Name')}</td>
                            <td>{user.lastName}</td>
                        </tr>
                        <tr>
                            <td>{t('Email')}</td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td>{t('Account type')}</td>
                            <td>{user.accountType}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
