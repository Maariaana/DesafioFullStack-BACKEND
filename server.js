require('dotenv').config();

// Verifica se a variável JWT_SECRET está definida
if (!process.env.JWT_SECRET) {
  console.error('❌ ERRO: JWT_SECRET não está definido no .env');
  process.exit(1); // Encerra o servidor
}

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(dashboardRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
});