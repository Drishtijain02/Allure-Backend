const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = "allure_secret_key";

// REGISTER (run once)
router.post('/register', async (req, res) => {
  const { phone, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({ phone, password: hashed });
  await user.save();

  res.json({ message: "User created" });
});

// LOGIN
router.post('/login', async (req, res) => {
  const { phone, password } = req.body;

  const user = await User.findOne({ phone });
  if (!user) return res.status(400).json({ error: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Wrong password" });

  const token = jwt.sign({ id: user._id }, "allure_secret_key");

  res.json({ token });
});
module.exports = router;