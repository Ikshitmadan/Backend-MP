var jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token " });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token " });
  }
};
module.exports = authMiddleware;