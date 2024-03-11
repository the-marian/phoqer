export const CHAT_BACK_URL_KEY = 'chat_back_url';

export class ChatsPage {
    close = (locale = 'en-US'): void => {
        let url = `/${locale}`;
        try {
            url = localStorage.getItem(CHAT_BACK_URL_KEY) ?? `/${locale}`;
        } catch {
            console.log('chats localStorage.getItem(CHAT_BACK_URL_KEY); error');
        }
        window.location.href = url;
    };

    open = (locale = 'en-US', chatId = ''): void => {
        this.setUrl();
        window.location.href = `/${locale}/chats/${chatId}`;
    };

    setUrl = (): void => {
        try {
            localStorage.setItem(CHAT_BACK_URL_KEY, window.location.href);
        } catch {
            console.log('chats localStorage.setItem(CHAT_BACK_URL_KEY, window.location.href); error');
        }
    };
}

export const chatsPage = new ChatsPage();
