import { FC, MouseEvent, useEffect, useState } from 'react';

import { random, range } from 'lodash-es';
import { useRouter } from 'next/router';
import { Flex, Link, ICategories, Skeleton } from 'phoqer';

import { useErrorToast } from '@app/hook/error-toast.hook';
import { categoriesService } from '@app/services/categories.service';
import { queryParams } from '@app/utils/query-params';

import css from './categories.module.scss';

const skeletonArray = range(9);

export const Categories: FC = () => {
    const { pathname, query, push } = useRouter();
    const errorToast = useErrorToast();

    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<ICategories>([]);

    const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        push((event.currentTarget as HTMLAnchorElement)?.href, undefined, { scroll: false });
    };

    useEffect(() => {
        categoriesService
            .getCategories()
            .then(setCategories)
            .catch(() => errorToast())
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <Flex direction="column" align="flex-start" className={css.categories}>
            {isLoading
                ? skeletonArray.map(item => <Skeleton key={item} style={{ height: '3rem', width: random(40, 80) + '%' }} />)
                : categories.map(item => (
                      <Link
                          size="sm"
                          key={item.slug}
                          onClick={handleLinkClick}
                          isDisabled={item.slug === query.category}
                          variant={item.slug === query.category ? 'text' : 'ghost'}
                          href={pathname + '?' + queryParams({ ...query, category: item.slug })}
                      >
                          {item.title}
                      </Link>
                  ))}
        </Flex>
    );
};
