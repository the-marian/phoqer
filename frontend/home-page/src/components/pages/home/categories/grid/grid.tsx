import { FC } from 'react';

import Link from 'next/link';
import { Background, ICategories, increment, Heading, Image, Text } from 'phoqer';
import { CSSTransition } from 'react-transition-group';

import { routes } from '@app/utils/routes';

import css from './grid.module.scss';

interface Props {
    categories: ICategories;
}
export const Grid: FC<Props> = ({ categories }) => {
    return (
        <div className={css.root}>
            {categories.length
                ? categories.slice(0, 5)?.map((category, index) => (
                      <CSSTransition key={category.slug} timeout={increment(index, 5)} unmountOnExit in appear>
                          <Link href={routes.search({ category: category.slug })} className={css.item}>
                              <Heading as="h3" size="sm" className={css.title}>
                                  <Image className={css.emoji} src={category.emoji} />
                                  {category.title}
                              </Heading>
                              <Text className={css.description}>{category.description}</Text>

                              {index === 0 && <Background />}
                          </Link>
                      </CSSTransition>
                  ))
                : null}
        </div>
    );
};
