import React from 'react';

import { Text, Title, TypographySize } from 'phoqer';

import css from './shared.module.scss';

interface Props {
    title: string;
    description?: string;
}

export const Heading = ({ title, description }: Props): JSX.Element => {
    return (
        <div className={css.mb}>
            <Title className={css.title} size={TypographySize.LX}>
                {title}
            </Title>
            {description && (
                <div className={css.inner}>
                    <Text className={css.text}>{description}</Text>
                </div>
            )}
        </div>
    );
};
