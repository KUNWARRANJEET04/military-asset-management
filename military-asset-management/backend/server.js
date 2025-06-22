// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const sequelize = require('./config/database');
// const assetRoutes = require('./routes/assets');
// const purchaseRoutes = require('./routes/purchaseRoutes');
// const assignmentRoutes = require('./routes/assignmentRoutes');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use('/api/assignments', assignmentRoutes);

// // ✅ Request logger (MUST be before routes)
// app.use((req, res, next) => {
//   console.log(`Incoming ${req.method} request to ${req.url}`);
//   next();
// });

// // API Routes
// app.use('/api/assets', assetRoutes);
// app.use('/api/purchases', purchaseRoutes);

// // Test route
// app.get('/', (req, res) => {
//   res.send('🛡️ Military Asset Management API is running!');
// });

// // ✅ Error handler (at bottom)
// app.use((err, req, res, next) => {
//   console.error('🔥 Global Error:', err);
//   res.status(500).json({ error: 'Something went wrong' });
// });

// // Connect to DB
// sequelize.authenticate()
//   .then(() => {
//     console.log('✅ Database connected!');
//     return sequelize.sync();
//   })
//   .then(() => {
//     console.log('✅ Models synced!');
//     const PORT = 4000;
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   })
//   .catch((err) => {
//     console.error('❌ Sequelize error:', err.message);
//   });


// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authenticateJWT = require('./middleware/authenticateJWT');
const app = express();
const { sequelize } = require('./models');

// Routes
const assetRoutes = require('./routes/assets');
const purchaseRoutes = require('./routes/purchaseRoutes');
const transferRoutes = require('./routes/transferRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const dashboardRoutes = require('./routes/dashboard');
const authRoutes = require('./routes/authRoutes');
const mockAuth = require('./middleware/mockAuth');


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use(mockAuth); // Inject mock user for RBAC
app.use('/api', authenticateJWT);

// Use Routes
app.use('/api/assets', assetRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/dashboard', dashboardRoutes);


// Sync DB and Start Server
sequelize.sync().then(() => {
  app.listen(4000, () => {
    console.log('✅ Server is running at http://localhost:4000');
  });
}).catch((err) => {
  console.error('❌ Failed to sync database:', err);
});
