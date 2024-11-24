const jwt = require("jsonwebtoken");

module.exports = (payload, expired) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: expired,
  });
  return token;
};
