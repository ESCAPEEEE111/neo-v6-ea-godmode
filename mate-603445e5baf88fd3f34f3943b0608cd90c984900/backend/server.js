require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

// Connect to MongoDB
mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Validate environment variables
if (!process.env.MONGO_URL || !process.env.DB_NAME) {
    console.error('Missing required environment variables: MONGO_URL or DB_NAME');
    process.exit(1);
}

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    await mongoose.connection.close();
    process.exit(0);
});

// Error logging middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Example route
app.get('/api', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

// Add 404 error handling middleware
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Update dynamic port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
