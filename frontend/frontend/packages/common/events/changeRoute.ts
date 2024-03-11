const EVENT_NAME = 'change-route';

export const changeRoute = {
    subscribe: (callback: EventListener): void => {
        document.body.addEventListener(EVENT_NAME, callback);
    },

    unsubscribe: (callback: EventListener): void => {
        document.body.removeEventListener(EVENT_NAME, callback);
    },

    submit: (href: string): void => {
        document.body.dispatchEvent(
            new CustomEvent<string>(EVENT_NAME, {
                bubbles: true,
                detail: href,
            }),
        );
    },
};
