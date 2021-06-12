import notifications from '../components/common/notifications';
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

    socket = new WebSocket(`ws://phoqer.com/api/v2/chat/${id}?token=${auth.access_token}`);
    socket.onopen = () => {
        console.log('Connected');
    };
    socket.onerror = () => {
        notifications.error({ title: 'Chat error', message: 'Some error with chat. Try to reload your browser' });
    };

    return socket;
};

export default useChat;
