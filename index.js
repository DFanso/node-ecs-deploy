const express = require('express');
const app = express();
const port = 3000;

// Array of greetings in different languages
const greetings = [
    "Hello!",
    "¡Hola!",
    "Bonjour!",
    "Ciao!",
    "こんにちは!",
    "안녕하세요!",
    "Hallo!",
    "Olá!",
    "Привет!",
    "你好!"
];

// Random greeting endpoint
app.get('/greeting', (req, res) => {
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    res.json({ greeting: randomGreeting });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '1.0.0'
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the Random Greeting API! Try /greeting for a random greeting or /health for health check.');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port 3000`);
});
