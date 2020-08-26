const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {

  const authtoken = req.headers["authorization"];

  const token = authtoken.replace("Bearer ", "");
  
  jwt.verify(token, "task", (err, payload) => {
    console.log(payload);
    if (payload.role === "customer") {
      next();
    } else {
      res.status(401).json({ msg: "unathorized" });
    }
  });
};

module.exports = auth;
