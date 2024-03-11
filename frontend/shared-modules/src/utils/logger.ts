import { AxiosResponse, AxiosError } from 'axios';

class Logger {
    private isLogging = typeof window === 'undefined' || !process.env.PHOQER_HIDE_LOGS;

    public responseLogger = (response: AxiosResponse): AxiosResponse => {
        if (this.isLogging) {
            const {
                config: { baseURL, url, method },
                status,
                statusText,
            } = response;

            console.log(`[Frontend] [RESPONSE] ${method} ${baseURL}${url} ${status} ${statusText} ${this.getDate()}`);
        }

        return response;
    };

    public errorLogger = (error: AxiosError): void => {
        if (!this.isLogging) {
            return;
        }

        if (!error.config) {
            console.error('[Frontend] [ERROR] Unknown Error ' + this.getDate() + ' ' + error.message);
            return;
        }

        const { config, response } = error;

        const { method, baseURL, url } = config;
        const status = response?.status ?? '';
        const statusText = response?.statusText ?? '';

        console.error(`[Frontend] [ERROR] ${method} ${baseURL}${url} ${status} ${statusText} ${this.getDate()}`);
    };

    public errorPromiseLogger = (error: AxiosError): Promise<AxiosError> => {
        this.errorLogger(error);
        return Promise.reject<AxiosError>(error);
    };

    private addZero = (value: string | number, len = 2): string => {
        return String(value).padStart(len, '0');
    };

    private getDate = (): string => {
        const date = new Date();
        return `${this.addZero(date.getDate())}.${this.addZero(date.getMonth() + 1)}.${this.addZero(
            date.getFullYear(),
            4,
        )} ${this.addZero(date.getHours())}:${this.addZero(date.getMinutes())}:${this.addZero(date.getSeconds())}`;
    };
}

export const logger = new Logger();
