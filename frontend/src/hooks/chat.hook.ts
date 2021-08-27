import notifications from '../components/common/notifications';
import config from '../utils/config';

import useAuth from './auth.hook';

// singleton
let socket: WebSocket | null;
let prevId: string | number;

const useChat = (id: string | number): WebSocket | null => {
    const auth = useAuth();
    if (!auth) return null;

    if (socket && prevId === id) return socket;
    prevId = id;

    if (socket) {
        socket.close(1000, 'Close chat');
        socket = null;
    }

    socket = new WebSocket(`${config.socketUrl('v2')}/chat/${id}?token=${auth.access_token}`);
    socket.onclose = (ev): void => console.log(ev);
    socket.onerror = (): void => {
        notifications.error({
            title: 'Chat error-template',
            message: 'Some error-template with chat. Try to reload your browser',
        });
    };

    return socket;
};

export default useChat;
