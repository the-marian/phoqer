export const changeLocale = {
    subscribe: (callback: EventListener): void => {
        document.body.addEventListener('change-locale', callback);
    },

    unsubscribe: (callback: EventListener): void => {
        document.body.removeEventListener('change-locale', callback);
    },

    submit: (locale: string): void => {
        document.body.dispatchEvent(
            new CustomEvent<string>('change-locale', {
                bubbles: true,
                detail: locale,
            }),
        );
    },
};
