const jwt = require('jsonwebtoken');

// Generate access token
exports.generateAccessToken = (username: Object) => {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
};

// Verify access token
exports.authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  console.log('authHeader:', authHeader);

  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];
  console.log('token:', token);

  if (!token) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      console.log('jwt error:', err);

      if (err) {
        if (err.name === 'JsonWebTokenError') {
          return res.status(401).json({ message: 'Invalid token' });
        } else if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expired' });
        } else {
          return res.status(500).json({ message: 'Server error' });
        }
      }

      req.user = user;

      next();
    }
  );
};
