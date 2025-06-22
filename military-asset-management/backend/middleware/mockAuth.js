// backend/middleware/mockAuth.js

const mockAuth = (req, res, next) => {
  // You can change this role to 'Admin', 'BaseCommander', or 'LogisticsOfficer'
  req.user = {
    id: 1,
    username: 'testuser',
    role: 'Admin'
  };
  next();
};

module.exports = mockAuth;
