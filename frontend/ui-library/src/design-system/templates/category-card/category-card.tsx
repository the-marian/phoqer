import { FC } from 'react';

import { Text, Heading } from 'src/design-system/foundation';
import { Image } from 'src/design-system/media/image/image';
import { ICategory } from 'src/types/categories.type';

import css from './category-card.module.scss';

export interface CategoryCardProps {
    value: ICategory;
}
export const CategoryCard: FC<CategoryCardProps> = ({ value }) => {
    return (
        <div className={css.root}>
            <Image className={css.img} src={value.image} alt={value.title} />
            <Heading as="h3" className={css.title}>
                {value.title}
            </Heading>
            <Text className={css.description}>{value.description}</Text>
        </div>
    );
};
