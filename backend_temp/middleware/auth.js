const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.send("No token");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.send("Invalid token");
  }
};

module.exports = auth;