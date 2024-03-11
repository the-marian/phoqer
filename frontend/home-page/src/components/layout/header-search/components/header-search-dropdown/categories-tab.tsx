import { FC, useEffect, useMemo, useState } from 'react';

import { debounce } from 'lodash-es';
import { ICategories, Image, Option, Text, Heading, Flex } from 'phoqer';

import { HeaderSearchNotFound } from '@app/components/layout/header-search/components/header-search-not-found';
import css from '@app/components/layout/header-search/select-item.module.scss';
import { OffersListSkeleton } from '@app/components/offers-list/offers-list-skeleton';
import { useErrorToast } from '@app/hook/error-toast.hook';
import { categoriesService } from '@app/services/categories.service';
import { routes } from '@app/utils/routes';

import { useNavigation } from './hook';

interface Props {
    query: string;
    onClose: () => void;
}

export const CategoriesTab: FC<Props> = ({ query, onClose }) => {
    const errorToast = useErrorToast();
    const { navigate } = useNavigation(onClose);

    const [loading, setLoading] = useState(true);
    const [searchResult, setSearchResult] = useState<ICategories>([]);

    const handleFetch = useMemo(
        () =>
            debounce(value => {
                categoriesService
                    .getCategories({ query: value })
                    .then(setSearchResult)
                    .catch(errorToast)
                    .finally(() => setLoading(false));
            }, 500),
        [],
    );

    useEffect(() => {
        setLoading(true);
        handleFetch(query);
    }, [handleFetch, query]);

    if (loading) {
        return <OffersListSkeleton />;
    }

    if (!searchResult.length) {
        return <HeaderSearchNotFound />;
    }

    return (
        <>
            {searchResult.map(category => (
                <Option key={category.title} onClick={() => navigate(routes.search({ category: category.slug }))}>
                    <Flex align="center" justify="space-between">
                        <Image className={css.image} src={category.image} alt={category.title} />

                        <div className={css.inner}>
                            <Heading as="h3" size="xs">
                                {category.title}
                            </Heading>
                            <Text size="xs">{category.description}</Text>
                        </div>
                    </Flex>
                </Option>
            ))}
        </>
    );
};
