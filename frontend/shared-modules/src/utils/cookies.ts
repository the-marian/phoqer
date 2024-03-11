export class Cookies {
    static get(): Record<string, string> {
        return this.decode(document.cookie);
    }

    static set(key: string, value: string | number): void {
        document.cookie = this.encode(key, value);
    }

    static encode(key: string, value: string | number): string {
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 2);

        return `${key}=${value};expires=${expires};path=/`;
    }

    static decode(cookie = ''): Record<string, string> {
        if (!cookie) return {};

        const decodedCookie = decodeURIComponent(cookie).split(';');

        return decodedCookie.reduce<Record<string, string>>((acc, item) => {
            const [key, value] = item.split('=');
            acc[key.trim()] = value.trim();

            return acc;
        }, {});
    }
}
