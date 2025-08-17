const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true, required: true },
  tokenHash: { type: String, required: true, index: true }, // store hash, never raw
  ua: String,
  ip: String,
  expiresAt: { type: Date, required: true, index: true },
  revokedAt: Date,
}, { timestamps: true });