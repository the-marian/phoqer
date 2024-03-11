import { Pagination } from 'query';

export const getEmptyPagination = <T = []>(): Pagination<T> => ({
    data: [] as T,
    limit: 0,
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
});
