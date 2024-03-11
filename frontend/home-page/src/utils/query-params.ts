import { omitBy } from 'lodash-es';
import queryString from 'query-string';

export const queryParams = (query: Record<string, unknown>): string => {
    return queryString.stringify(omitBy(query, v => !v));
};
