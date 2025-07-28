const express = require("express")
const router = express.Router();

const { signUp, logIn, signupWithInvite } = require("../controllers/authController");

router.post("/signup", signUp);
router.post("/login", logIn);

// Route to handle invitation base signup
router.post("/signup-invite", signupWithInvite);


module.exports = router;