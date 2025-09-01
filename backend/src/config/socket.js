const connectedUsers = new Map();

const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log(`A user connected: ${socket.id}`);

        socket.on('login', (userId) => {
            connectedUsers.set(userId, socket.id);
            console.log(`User registered: ${userId} with socket ${socket.id}`);
        });

        socket.on('logout', (userId) => {
            console.log(`User ${userId} logget out`);
            connectedUsers.delete(userId);
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);

            for (const [userId, socketId] of connectedUsers.entries()) {
                if (socketId === socket.id) {
                    connectedUsers.delete(userId);
                    console.log(`User ${userId} removed from active connections`);
                    break;
                }
            }
        });
    });
}

module.exports = socketHandler;