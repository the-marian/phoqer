import { FC, PropsWithChildren, useContext } from 'react';

import { Avatar, Dropdown, Text, Heading, useIsOpen } from 'phoqer';

import { AuthContext } from 'src/context/auth.context';

import css from './user-nav.module.scss';

export const UserNav: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useContext(AuthContext);
    const { isOpen, onOpen, onClose } = useIsOpen();

    return (
        <div className={css.wrp}>
            <button className={css.user} type="button" onClick={onOpen}>
                <Avatar size="sm" className={css.avatar} src={user.avatar as string} alt={`${user.firstName} ${user.lastName}`} />
            </button>

            <Dropdown position="right" isOpen={isOpen} onClose={onClose} className={css.dropdown}>
                <div className={css.inner}>
                    <Heading size="sm" className={css.userName}>
                        {user.firstName} {user.lastName}
                    </Heading>
                    <Text size="sm" className={css.userEmail}>
                        {user.email}
                    </Text>
                </div>

                <div className="hr" />

                {children}
            </Dropdown>
        </div>
    );
};
