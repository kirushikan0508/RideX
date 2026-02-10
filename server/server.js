const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

// Load config
dotenv.config();

// Connect Database
connectDB();


const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/authRoutes'));
app.use('/api/vehicles', require('./routes/vehicleRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

app.get('/', (req, res) => {
    res.send('RideX API is running...');
});

// Socket.io Setup
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

let onlineUsers = [];

const addUser = (userId, socketId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
        onlineUsers.push({ userId, socketId });
};

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return onlineUsers.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // Take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", onlineUsers);
    });

    // Send and get message
    socket.on("sendMessage", async ({ senderId, receiverId, text, conversationId }) => {
        const user = getUser(receiverId);

        // Save message to DB
        try {
            const Message = require('./models/MessageModel');
            const Conversation = require('./models/ConversationModel');

            const newMessage = new Message({
                conversationId,
                sender: senderId,
                text,
            });
            const savedMessage = await newMessage.save();

            // Update last message
            await Conversation.findByIdAndUpdate(conversationId, {
                lastMessage: text,
                lastMessageId: savedMessage._id
            });

            if (user) {
                io.to(user.socketId).emit("getMessage", {
                    senderId,
                    text,
                    conversationId,
                    createdAt: Date.now()
                });
            }
        } catch (err) {
            console.log(err);
        }
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected', socket.id);
        removeUser(socket.id);
        io.emit("getUsers", onlineUsers);
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
