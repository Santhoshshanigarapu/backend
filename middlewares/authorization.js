const jwt = require('jsonwebtoken');

module.exports = function checkToken(req, res, next) {
  const token = req.header('auth');
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(400).json({ message: "Token expired" });
        }
        return res.status(401).json({ message: "Unauthorized user" });
      }
      req.user = decoded;
      //  console.log(decoded);
      //  console.log(`req.user:  ${req.user}`);
      // console.log(req.user);

      next();
    });
  } catch (err) {
    // res.status(400).json({ message: "Invalid Token" });
    res.status(401).json(err);
  }
};
