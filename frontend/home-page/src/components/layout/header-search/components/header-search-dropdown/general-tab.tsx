import { FC, useEffect, useRef, useState } from 'react';

import Fuse from 'fuse.js';
import { SelectOption, Image, Text, Heading, Flex } from 'phoqer';

import { searchMap } from '@app/assets/search-map';
import { useNavigation } from '@app/components/layout/header-search/components/header-search-dropdown/hook';
import { HeaderSearchNotFound } from '@app/components/layout/header-search/components/header-search-not-found';
import css from '@app/components/layout/header-search/select-item.module.scss';

const options = {
    keys: ['title', 'description'],
};

interface SearchType {
    title: string;
    description: string;
    image: string;
    url: string;
}

interface Props {
    query: string;
    onClose: () => void;
}
export const GeneralTab: FC<Props> = ({ query, onClose }) => {
    const { navigate, locale } = useNavigation(onClose);
    const fuse = useRef<Fuse<SearchType> | null>(null);
    const [searchResult, setSearchResult] = useState<Fuse.FuseResult<SearchType>[]>([]);

    useEffect(() => {
        fuse.current = new Fuse(searchMap[locale], options);
    }, [locale]);

    useEffect(() => {
        if (fuse.current) {
            setSearchResult(fuse.current.search(query));
        }
    }, [query]);

    if (!searchResult.length) {
        return <HeaderSearchNotFound />;
    }

    return (
        <>
            {searchResult.map(({ item }) => (
                <SelectOption key={item.title} value={`/${locale}${item.url}`} onClick={navigate}>
                    <Flex align="center" justify="space-between">
                        <Image className={css.image} src={item.image} alt={item.title} />

                        <div className={css.inner}>
                            <Heading as="h3" size="xs">
                                {item.title}
                            </Heading>
                            <Text size="xs">{item.description}</Text>
                        </div>
                    </Flex>
                </SelectOption>
            ))}
        </>
    );
};
