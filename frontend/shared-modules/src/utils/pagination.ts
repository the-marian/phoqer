import { Pagination } from 'phoqer';

export const getEmptyPagination = <T extends []>(): Pagination<T> => ({
    data: [] as T,
    limit: 0,
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
});
