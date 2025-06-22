// backend/middleware/authorizeRole.js ✅
module.exports = function (allowedRoles) {
  return (req, res, next) => {
    console.log('JWT User Role:', req.user?.role);
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};
