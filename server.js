const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);




const port = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connect to MongoDB
const mongoURI =
  'mongodb+srv://wasiullahkhan:bSPqs4QmMJaKGBGt@si.f5b544t.mongodb.net/test?retryWrites=true&w=majority';

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Import and use your routes
const equipmentRoutes = require('./routes/equipmentRoutes');
const venueRoutes = require('./routes/venueRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const sportRoutes = require('./routes/sportRoutes'); // Import your sport routes
const employeeRoutes = require('./routes/employeeRoutes');
const adminRoutes = require('./routes/adminRoutes');


// Use your routes with appropriate prefixes
app.use('/api/equipment', equipmentRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/sports', sportRoutes); // Use the sport routes
// Use admin and employee authentication routes
app.use('/api/admin', adminRoutes);
app.use('/api/employee', employeeRoutes);
// Set up WebSocket handlers
io.on('connection', (socket) => {
  console.log('A user connected');
  // Handle custom events, e.g., for sending notifications to clients
  socket.on('notification', (message) => {
    // Broadcast the message to all connected clients
    io.emit('notification', message);
  });
  
  // Handle disconnections if needed
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
