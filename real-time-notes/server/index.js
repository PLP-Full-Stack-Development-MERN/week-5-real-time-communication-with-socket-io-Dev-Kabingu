const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv =  require('dotenv');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const noteRoutes = require('./routes/notes');
const connectDB = require('./config/db');

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/notes', noteRoutes);

connectDB();

// Socket.io logic
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('join-room', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
        socket.to(room).emit('user-joined', `A new user joined room: ${room}`);
    });

    socket.on('edit-note', ({ room, content }) => {
        socket.to(room).emit('update-note', content);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
