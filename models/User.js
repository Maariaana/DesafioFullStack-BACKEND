const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('user', {
  nome: DataTypes.STRING,
  email: DataTypes.STRING
});

module.exports = User;