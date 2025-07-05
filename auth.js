const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const users = new Map();
const SECRET = process.env.SECRET || 'tajnyklucz';

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (users.has(username)) return res.status(400).json({ msg: 'Użytkownik istnieje' });
  const hash = await bcrypt.hash(password, 10);
  users.set(username, { username, hash });
  res.json({ msg: 'Zarejestrowano' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.get(username);
  if (!user || !(await bcrypt.compare(password, user.hash))) return res.status(400).json({ msg: 'Nieprawidłowe dane' });
  const token = jwt.sign({ username }, SECRET);
  res.json({ token });
});

module.exports = router;