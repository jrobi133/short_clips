const jwt = require("jsonwebtoken");

// set token secret and expiration date
const secret = "mysecretsshhhhh";
const expiration = "2h";

/**
 * removeSensitiveData
 * @param {object|array} data - Data to be encrypted
 * @returns {object|array} - cleanedData
 */
const removeSensitiveData = (data, sensitiveData = ["password"]) => {
  if (typeof data === "object" && data !== null) {
    // Detect Object
    return Object.entries(data).reduce((accumulator, [key, value]) => {
      if (sensitiveData.includes(key)) {
        return accumulator; // Remove sensitive data
      }

      // Not sensitive data
      if (typeof value === "object" && value !== null) {
        return {
          ...accumulator,
          [key]: removeSensitiveData(value, sensitiveData),
        };
      }

      return { ...accumulator, [key]: value };
    }, {});
  } else if (Array.isArray(data)) {
    // Detect Array
    if (data.length > 0 && typeof data[0] === "object" && data[0] !== null) {
      // First element is object
      return data.map((item) => removeSensitiveData(item, sensitiveData));
    }
  }
};

module.exports = {
  // function for our authenticated routes
  authMiddleware: function (req, res, next) {
    // allows token to be sent via  req.query or headers
    let token = req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return res.status(400).json({ message: "You have no token!" });
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
      return res.status(400).json({ message: "invalid token!" });
    }

    // send to next endpoint
    next();
  },
  signToken: function (data) {
    data = removeSensitiveData(data);
    return jwt.sign({ data }, secret, { expiresIn: expiration });
  },
};
