import React from 'react';

import { Text, TypographySize } from 'phoqer';

import css from './auth-services.module.scss';
import { Facebook } from './icons/facebook';
import { Google } from './icons/google';

export const AuthServices = (): JSX.Element => {
    return (
        <ul className={css.list}>
            <li>
                <a className={css.item} href="#google">
                    <Google />
                    <Text size={TypographySize.SM}>Google</Text>
                </a>
            </li>
            <li>
                <a className={css.item} href="#facebook">
                    <Facebook />
                    <Text size={TypographySize.SM}>Facebook</Text>
                </a>
            </li>
        </ul>
    );
};
