import { io } from 'socket.io-client'
import useOnlineUsers from './useOnlineUsers'

let socket = null;

function useSocket() {
    const { setOnlineUsers } = useOnlineUsers();

    const connectSocket = (userId) => {
        if (socket) {
            console.warn('Socket already connected');
            return socket;
        }

        socket = io(import.meta.env.VITE_BACKEND_URL, {
            query: {
                userId: userId,
            },
        });

        socket.on('connect', () => {
            console.log('Connected to server:', socket.id);
        });

        socket.on('disconnect', (reason) => {
            console.log('Disconnected from server:', reason);

            if (reason === 'io server disconnect') {
                console.log('Manually reconnecting...');
                socket.connect();
            }
        });

        socket.on('getOnlineUsers', (userIds) => {
            setOnlineUsers(userIds);
        });

        return socket;
    };

    const disConnectSocket = () => {
        if (socket) {
            socket.disconnect();
            console.log('Socket disconnected');
            socket = null;
        } else {
            console.warn('No active socket to disconnect');
        }
    };

    return { connectSocket, disConnectSocket };
}

export default useSocket;
