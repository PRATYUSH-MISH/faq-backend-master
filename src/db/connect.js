const mongoose = require('mongoose');
const redis = require('redis');

// Configure Redis client
const redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://127.0.0.1:6379', // Default to local Redis
    socket: {
        tls: false, // No TLS for local development
        reconnectStrategy: (attempts) => Math.min(attempts * 100, 3000),
    },
});

// MongoDB Connection Function
const initializeMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('✅ Successfully connected to MongoDB');
    } catch (err) {
        console.error('❌ MongoDB connection failed:', err);
        process.exit(1);
    }
};

// Redis Event Listeners
redisClient.on('connect', () => console.log('🚀 Redis server connected'));
redisClient.on('error', (error) => console.error('⚠️ Redis error:', error));

// Establish Redis Connection
redisClient.connect();

module.exports = { initializeMongoDB, redisClient };
