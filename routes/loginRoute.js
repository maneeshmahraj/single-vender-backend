const express = require("express");
const { loginWithMobile, loginWithEmail } = require("../controllers/loginController");

const router = express.Router();

router.post("/mobile", loginWithMobile);
router.post("/email", loginWithEmail);

module.exports = router;
