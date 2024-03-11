import React from 'react';

import { ICategory, Image, Text, Title, TypographySize } from 'phoqer';

import css from './category-item.module.scss';

interface Props {
    category: ICategory;
}

export const CategoryItem = ({ category }: Props): JSX.Element => {
    return (
        <div className={css.category}>
            <Image className={css.image} src={category.image} alt={category.title} />
            <div className={css.content}>
                <Title size={TypographySize.SX} className={css.title}>
                    {category.title}
                </Title>
                <Text size={TypographySize.SM} className={css.description}>
                    {category.description}
                </Text>
            </div>
        </div>
    );
};
