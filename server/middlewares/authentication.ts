const jwt = require('jsonwebtoken');

// Generate access token
exports.generateAccessToken = (username: Object) => {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
};

// Verify access token
exports.authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      console.log(err);

      if (err) return res.sendStatus(403);

      req.user = user;

      next();
    }
  );
};
