// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

// Simulated roles: admin, commander, logistics
const roles = {
  ADMIN: 'admin',
  COMMANDER: 'commander',
  LOGISTICS: 'logistics'
};

// Middleware to verify JWT and extract user role
const authorize = (allowedRoles) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    try {
      const decoded = jwt.verify(token, 'your_jwt_secret');
      req.user = decoded;

      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = { authorize, roles };
