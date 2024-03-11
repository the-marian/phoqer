import { FC } from 'react';

import Link from 'next/link';
import { ICategories, Image, increment, Text } from 'phoqer';
import { CSSTransition } from 'react-transition-group';

import { routes } from '@app/utils/routes';

import css from './list.module.scss';

interface Props {
    categories: ICategories;
}
export const List: FC<Props> = ({ categories }) => {
    return (
        <div className={css.root}>
            {categories.length
                ? categories.map((category, index) => (
                      <CSSTransition in key={category.slug} timeout={increment(index, categories.length)} unmountOnExit appear>
                          <Link
                              href={routes.search({ category: category.slug })}
                              className={css.item}
                              title={category.description}
                          >
                              <Image className={css.image} src={category.image} alt={category.title} />
                              <Text as="h3" size="sm" className={css.title}>
                                  {category.title}
                              </Text>
                          </Link>
                      </CSSTransition>
                  ))
                : null}
        </div>
    );
};
