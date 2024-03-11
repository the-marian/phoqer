import { AxiosError } from 'axios';

export const errorHandler = async <T = Record<string, unknown>>(callback: () => Promise<T>, defaultValue: T): Promise<T> => {
    try {
        return await callback();
    } catch (error) {
        console.dir((error as AxiosError)?.toJSON());
        return defaultValue;
    }
};
