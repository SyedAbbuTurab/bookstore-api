const jwt = require("jsonwebtoken");
const crypto = require("crypto");

exports.signAccessToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15m" });


exports.generateRefreshValue = () => crypto.randomBytes(40).toString("hex");
exports.hash = (v) => crypto.createHash("sha256").update(v).digest("hex");