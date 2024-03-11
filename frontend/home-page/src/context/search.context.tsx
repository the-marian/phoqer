import React, { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { ICategory, User } from 'phoqer';

import { useErrorToast } from '@app/hook/error-toast.hook';
import { categoriesService } from '@app/services/categories.service';
import { usersService } from '@app/services/users.service';

interface SearchContextType {
    queryParams: Record<string, string>;
    category: {
        isLoading: boolean;
        data: ICategory | null;
    };
    author: {
        isLoading: boolean;
        data: User | null;
    };
}
export const SearchContext = createContext<SearchContextType>({} as SearchContextType);

export const SearchProvider: FC<PropsWithChildren> = ({ children }) => {
    const { query } = useRouter();
    const errorToast = useErrorToast();

    const [author, setAuthor] = useState<SearchContextType['author']>({ isLoading: false, data: null });
    const [category, setCategory] = useState<SearchContextType['category']>({ isLoading: false, data: null });

    useEffect(() => {
        if (query.author) {
            setAuthor(prev => ({ ...prev, isLoading: true }));
            usersService
                .findUserById(query.author as string)
                .then(data => setAuthor({ data, isLoading: false }))
                .catch(() => errorToast());
        }
    }, [query.author]);

    useEffect(() => {
        if (query.category) {
            setCategory(prev => ({ ...prev, isLoading: true }));
            categoriesService
                .singleCategory(query.category as string)
                .then(data => setCategory({ data, isLoading: false }))
                .catch(() => errorToast());
        }
    }, [query.category]);

    return <SearchContext.Provider value={{ queryParams: {}, category, author }}>{children}</SearchContext.Provider>;
};

export const useSearch = () => useContext(SearchContext);
