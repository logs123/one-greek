import { io, Socket } from 'socket.io-client';

interface ServerToClientEvents {
    welcome: (message: string) => void;
    logoutSuccess: (message: string) => void;
}

interface ClientToServerEvents {
    login: (userId: string) => void;
    signup: (data: { userId: string; username: string; }) => void;
    logout: (userId: string) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:3500', {
    autoConnect: false,
    reconnection: true,
});

export const emitLogin = (userId: string) => {
    if (!socket.connected) {
        socket.connect();
    }
    socket.emit('login', userId);
}

export const emitSignup = (userId: string, username: string) => {
    if (!socket.connected) {
        socket.connect();
    }
    socket.emit('signup', { userId, username });
}

export const emitLogout = (userId: string) => {
    socket.emit('logout', userId);
    socket.disconnect();
}