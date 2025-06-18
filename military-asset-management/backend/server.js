const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const assetsRoute = require('./routes/assets');
const { Sequelize } = require('sequelize');

const app = express();
const port = 5000;

// Middleware
app.use('/api', assetsRoute);
app.use(cors());
app.use(bodyParser.json());

// Database Setup
const sequelize = new Sequelize('postgres://postgres:Garima@9@localhost:5432/military_db');

sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Database connection failed:', err));

// Basic API Route
app.get('/api/status', (req, res) => {
  res.json({ status: 'API is running' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
