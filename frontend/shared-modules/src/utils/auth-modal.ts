export const authModal = {
    subscribe: (callback: EventListener): void => {
        document.body.addEventListener('auth-modal', callback);
    },

    unsubscribe: (callback: EventListener): void => {
        document.body.removeEventListener('auth-modal', callback);
    },

    submit: (): void => {
        document.body.dispatchEvent(new CustomEvent<string>('auth-modal', { bubbles: true }));
    },
};
