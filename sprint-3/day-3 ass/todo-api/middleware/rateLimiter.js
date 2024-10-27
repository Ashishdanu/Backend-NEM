// middleware/rateLimiter.js
let requestCounts = {};

module.exports = (req, res, next) => {
  const ip = req.ip;
  requestCounts[ip] = (requestCounts[ip] || 0) + 1;

  if (requestCounts[ip] > 100) {
    return res.status(429).json({ message: 'Too many requests. Please try again later.' });
  }

  setTimeout(() => { requestCounts[ip]--; }, 60000);
  next();
};
