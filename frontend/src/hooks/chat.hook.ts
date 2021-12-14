import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import types from '../redux/types';
import config from '../utils/config';

import useAuth from './auth.hook';

// singleton
let socket: WebSocket | null;
let prevId: string | number;

const useChat = (id: string | number): WebSocket | null => {
    const { token } = useAuth();
    if (!token.access_token) return null;

    if (socket && prevId === id) return socket;
    prevId = id;

    if (socket) {
        socket.close(1000, 'Close chat');
        socket = null;
    }

    socket = new WebSocket(`${config.socketUrl}/chat/${id}?token=${token.access_token}`);
    socket.onclose = (ev): void => console.log(ev);
    socket.onerror = (): void => {
        socket?.close(1000, 'Close chat');
        socket = new WebSocket(`${config.socketUrl}/chat/${id}?token=${token.access_token}`);
    };

    return socket;
};

export const useChatListUpdate = (): void => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: types.GET_CHATS_START });
        dispatch({ type: types.RESET_CHAT_SIDEBAR });

        const id = setInterval(() => {
            dispatch({ type: types.REFRESH_CHATS_START });
        }, 10000);
        return () => clearInterval(id);
    }, [dispatch]);
};

export default useChat;
