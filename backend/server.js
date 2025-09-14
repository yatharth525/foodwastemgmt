const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const donationRoutes = require('./routes/donationRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Use a single CORS configuration for all Express routes
app.use(cors({
  origin: 'http://localhost:3000', // Frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', // Frontend's URL
    methods: ['GET', 'POST'],
  },
});

connectDB();

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/donations', donationRoutes);

// Socket.io for real-time updates
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));