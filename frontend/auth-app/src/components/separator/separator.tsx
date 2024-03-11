import React from 'react';

import { Text, TypographySize } from 'phoqer';

import css from './separator.module.scss';

interface Props {
    children: string;
}
export const Separator = ({ children }: Props): JSX.Element => {
    return (
        <div className={css.separator}>
            <Text as="span" size={TypographySize.SM}>
                {children}
            </Text>
        </div>
    );
};
