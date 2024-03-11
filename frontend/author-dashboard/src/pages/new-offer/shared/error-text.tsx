import React from 'react';

import { AlertIcon, Text, TypographySize } from 'phoqer';

import css from './shared.module.scss';

interface Props {
    error?: string;
}

export const ErrorText = ({ error }: Props): JSX.Element => {
    return (
        <>
            {error && (
                <Text as="span" size={TypographySize.SM} className={css.error}>
                    <AlertIcon /> {error}
                </Text>
            )}
        </>
    );
};
