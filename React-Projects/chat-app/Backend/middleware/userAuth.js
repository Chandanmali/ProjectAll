const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const userAuth = async (req, res, next) => {
  const token = req.headers.token;
  console.log("token: ", token);
  const tokenVerify = jwt.verify(token, JWT_SECRET);
  console.log(tokenVerify);

  if (tokenVerify.userId) {
    req.userId = tokenVerify.userId;
    next();
  } else {
    res.json({
        error: "Invalid user credentials",
           
    });
  }
};

module.exports = {
  userAuth,
};
