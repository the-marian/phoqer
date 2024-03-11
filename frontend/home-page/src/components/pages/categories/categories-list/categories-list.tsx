import { FC } from 'react';

import Link from 'next/link';
import { CategoryCard, Container, ICategories, Heading, Grid } from 'phoqer';
import { Appear } from 'phoqer-shared';

import { useTranslation } from '@app/hook/translations.hook';
import { routes } from '@app/utils/routes';

import css from './categories-list.module.scss';

interface Props {
    categories: ICategories;
}
export const CategoriesList: FC<Props> = ({ categories }) => {
    const { t } = useTranslation();

    return (
        <Appear>
            <section className={css.root}>
                <Container size="md">
                    <div className={css.header}>
                        <Heading as="h2" size="lg">
                            {t('Categories')}
                        </Heading>
                    </div>

                    <Grid className={css.grid} size={{ base: 1, sm: 2, md: 3, lg: 4 }}>
                        {categories.map(item => (
                            <Link key={item.slug} className="grid-item" href={routes.search({ category: item.slug })}>
                                <CategoryCard value={item} />
                            </Link>
                        ))}
                    </Grid>
                </Container>
            </section>
        </Appear>
    );
};
