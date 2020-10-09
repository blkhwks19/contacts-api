const Sequelize = require('sequelize');
const ContactModel = require('./models/Contact');

const sequelize = new Sequelize('contacts-db', 'root', 'root', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './database.sqlite3'
});

const Contact = ContactModel(sequelize, Sequelize);

sequelize.sync();

module.exports = {
  Contact
}