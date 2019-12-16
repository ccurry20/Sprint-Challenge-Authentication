/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (req.decodedJwt) {
    next();
  } else if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedJwt) => {
      // if the token doesn't verify
      if (err) {
        res.status(401).json({ you: "shall not pass!" });
        // if it DOES...
      } else {
        req.decodedJwt = decodedJwt;
        next();
      }
    });
  } else {
    res.status(401).json({ you: "can't touch that." });
  }
};

// module.exports = (req, res, next) => {
//   res.status(401).json({ you: "shall not pass!" });
// };
