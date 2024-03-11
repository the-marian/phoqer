export const changeTheme = {
    subscribe: (callback: EventListener): void => {
        document.body.addEventListener('change-theme', callback);
    },

    unsubscribe: (callback: EventListener): void => {
        document.body.removeEventListener('change-theme', callback);
    },

    submit: (theme: string): void => {
        document.body.dispatchEvent(
            new CustomEvent<string>('change-theme', {
                bubbles: true,
                detail: theme,
            }),
        );
    },
};
