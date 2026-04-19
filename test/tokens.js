const jwt = require('jsonwebtoken');

function bearerUser() {
  const token = jwt.sign(
    { sub: '507f1f77bcf86cd799439011', username: 'testuser', roles: ['user'] },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return `Bearer ${token}`;
}

function bearerAdmin() {
  const token = jwt.sign(
    { sub: '507f1f77bcf86cd799439012', username: 'adminuser', roles: ['user', 'admin'] },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return `Bearer ${token}`;
}

module.exports = { bearerUser, bearerAdmin };
