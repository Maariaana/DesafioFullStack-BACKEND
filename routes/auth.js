const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const exists = await User.findOne({ where: { email } });
      if (exists) return res.status(400).json({ message: 'Email já registrado' });
  
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        email,
        password: hashedPassword
      });
  
      res.status(201).json({ message: 'Usuário registrado com sucesso', user });
    } catch (err) {
      res.status(500).json({ error: 'Erro no registro' });
    }
  });
  

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Senha incorreta' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Erro no login' });
  }
});

module.exports = router;