export const highlightSearchQuery = (text: string, query?: string): string => {
    if (!query) return text;

    return text.replace(new RegExp(query.toLowerCase(), 'ig'), match => `<b>${match}</b>`);
};

class PrevSearch {
    private readonly STORAGE_KEY = 'phoqer-prev-search';

    get = (): string[] => {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY) ?? '[]');
        } catch {
            return [];
        }
    };

    set = (query: string): void => {
        try {
            const prev = new Set(this.get());
            prev.add(query);

            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(Array.from(prev)));
        } catch (error) {
            console.log(error);
        }
    };

    clear = (query: string): void => {
        try {
            const prev = this.get().filter(item => item != query);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(prev));
        } catch (error) {
            console.log(error);
        }
    };

    clearAll = () => {
        try {
            localStorage.setItem(this.STORAGE_KEY, '');
        } catch (error) {
            console.log(error);
        }
    };
}

export const prevSearch = new PrevSearch();
