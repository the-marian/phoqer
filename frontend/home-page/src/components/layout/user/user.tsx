import { FC } from 'react';

import { useRouter } from 'next/router';
import { Option, Skeleton, MailIcon, PersonIcon, BookmarksIcon, CaseIcon, LogOutIcon } from 'phoqer';
import { UserNav, useAuthContext, chatsPage, authModal } from 'phoqer-shared';

import { Link } from '@app/components/common/link/link';
import { useTranslation } from '@app/hook/translations.hook';
import { routes } from '@app/utils/routes';

import css from './user.module.scss';

export const User: FC = () => {
    const router = useRouter();
    const { t, locale } = useTranslation();
    const { auth, user, logout, loading } = useAuthContext();

    if (loading) {
        return <Skeleton color="blue" className={css.skeleton} />;
    }

    const openChat = (path: string) => {
        chatsPage.setUrl();
        router.push(path);
    };

    const isClientPathActive = location.pathname.includes('/client');
    const isAuthorPathActive = location.pathname.includes('/author');
    const isFavoritePathActive = location.pathname.includes('/favorite');

    return (
        <>
            {auth && user ? (
                <>
                    <UserNav>
                        <Option size="sm" onClick={() => openChat(routes.chats.list(locale))}>
                            <MailIcon className={css.icon} />
                            {t('Messages')}
                        </Option>

                        <Option size="sm" isActive={isFavoritePathActive} onClick={() => router.push(routes.favorite)}>
                            <BookmarksIcon className={css.icon} />
                            {t('Favorite offers')}
                        </Option>

                        <div className="hr" />

                        <Option size="sm" isActive={isAuthorPathActive} onClick={() => router.push(routes.author.home(locale))}>
                            <CaseIcon className={css.icon} />
                            {t('Author account')}
                        </Option>

                        <Option size="sm" isActive={isClientPathActive} onClick={() => router.push(routes.client.home(locale))}>
                            <PersonIcon className={css.icon} />
                            {t('Your account')}
                        </Option>

                        <div className="hr" />

                        <Option size="sm" onClick={logout}>
                            <LogOutIcon className={css.icon} />
                            {t('Log out')}
                        </Option>
                    </UserNav>
                </>
            ) : (
                <>
                    <Link variant="secondary" size="sm" className={css.mr1} href="#login" onClick={authModal.submit}>
                        {t('Log In')}
                    </Link>
                    <Link size="sm" className={css.signIn} href="#signup" onClick={authModal.submit}>
                        {t('Sign Up')}
                    </Link>
                </>
            )}
        </>
    );
};
