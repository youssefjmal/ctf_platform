import express from 'express';

const app = express();

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('hello world');
});

// Global error handler (should be after routes)

export default app;
