import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const verifyToken = (req, res, next) => {
  dotenv.config();
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

export default verifyToken;