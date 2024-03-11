import { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react';

import {
    Button,
    Container,
    HStack,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
} from '@chakra-ui/react';
import { debounce, omit } from 'lodash-es';
import { MdClose, MdSearch } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';

const TIMEOUT = 1_500;

export const SearchInput: FC = () => {
    const [, setSearchParams] = useSearchParams();
    const [localValue, setLocalValue] = useState('');

    const updateParams = (value: string) => {
        setSearchParams(prev => {
            const params = Object.fromEntries(Array.from(prev));

            const search = value.trim();
            if (!search) {
                return omit(params, 'search');
            }

            return { ...params, search };
        });
    };

    const debouncedSearch = useCallback(debounce(updateParams, TIMEOUT), []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLocalValue(event.target.value);
        debouncedSearch(event.target.value);
    };

    const handleClear = () => {
        setLocalValue('');
        debouncedSearch.cancel();
        updateParams('');
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        debouncedSearch.cancel();
        updateParams(localValue);
    };

    return (
        <Container size="2xl">
            <HStack as="form" action="#" onSubmit={handleSubmit}>
                <InputGroup>
                    <InputLeftElement h="100%" w={14} pointerEvents="none">
                        <Icon as={MdSearch} boxSize="24px" />
                    </InputLeftElement>
                    <Input value={localValue} onChange={handleChange} size="lg" pl={14} placeholder="Start typing ..." />

                    {localValue.trim() && (
                        <InputRightElement h="100%" w={10}>
                            <IconButton aria-label="CLear" mr={2} variant="icon" onClick={handleClear}>
                                <MdClose />
                            </IconButton>
                        </InputRightElement>
                    )}
                </InputGroup>

                <Button size="lg" fontSize="16px" variant="green">
                    Search offers
                </Button>
            </HStack>
        </Container>
    );
};
