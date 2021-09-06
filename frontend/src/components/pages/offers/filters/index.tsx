import React, { ReactElement } from 'react';

import SearchFilters from './search-filters';
import TopSearchQuery from './top-search-query';

const Filters = (): ReactElement => {
    return (
        <>
            <SearchFilters />
            <TopSearchQuery />
        </>
    );
};

export default Filters;
