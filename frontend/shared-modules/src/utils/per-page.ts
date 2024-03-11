const PER_PAGE_KEY = 'phoqer-per-page';

export const getPerPage = (): number => {
    try {
        const json = localStorage.getItem(PER_PAGE_KEY);
        if (json) {
            return JSON.parse(json);
        }

        return 10;
    } catch {
        return 10;
    }
};

export const setPerPage = (page: number): void => {
    try {
        localStorage.setItem(PER_PAGE_KEY, JSON.stringify(page));
    } catch (error) {
        console.log('Error set per page');
        console.dir(error);
    }
};
