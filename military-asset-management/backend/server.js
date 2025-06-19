const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database');
const assetRoutes = require('./routes/assets');
const purchaseRoutes = require('./routes/purchaseRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Request logger (MUST be before routes)
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.url}`);
  next();
});

// API Routes
app.use('/api/assets', assetRoutes);
app.use('/api/purchases', purchaseRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('🛡️ Military Asset Management API is running!');
});

// ✅ Error handler (at bottom)
app.use((err, req, res, next) => {
  console.error('🔥 Global Error:', err);
  res.status(500).json({ error: 'Something went wrong' });
});

// Connect to DB
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected!');
    return sequelize.sync();
  })
  .then(() => {
    console.log('✅ Models synced!');
    const PORT = 4000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ Sequelize error:', err.message);
  });
