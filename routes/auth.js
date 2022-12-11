const express = require('express');
const { signIn, signUp } = require('../controllers/auth')
const router = express.Router();

router.post('/loginUser', signIn);
router.post('/registerUser', signUp);

module.exports = router;