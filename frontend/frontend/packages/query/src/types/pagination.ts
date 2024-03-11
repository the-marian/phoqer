export type Pagination<T> = {
    data: T;
    limit: number;
    currentPage: number;
    totalPages: number;
    totalItems: number;
};
