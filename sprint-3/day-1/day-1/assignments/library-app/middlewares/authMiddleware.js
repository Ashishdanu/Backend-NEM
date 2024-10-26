// /middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (roles) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Authentication required' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles && !roles.some(role => decoded.roles.includes(role))) {
        return res.status(403).json({ message: 'Permission denied' });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = authMiddleware;
