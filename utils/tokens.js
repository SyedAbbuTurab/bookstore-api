const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.signAccessToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15m" });


exports.generateRefreshValue = () => crypto.randomBytes(40).toString("hex");
exports.hash = (v) => crypto.createHash("sha256").update(v).digest("hex");

exports.refreshExpiryDate = () => new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); 
