require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const { logEvents } = require('./middleware/logger');
const socketHandler = require('./config/socket');
const PORT = process.env.PORT || 3500;

connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/organizations', require('./routes/organizationRoutes'));
app.use('/chapters', require('./routes/chapterRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/events', require('./routes/eventRoutes'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: corsOptions.origin,
        methods: ['GET', 'POST']
    }
});
app.set('io', io);
socketHandler(io);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', err => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
});