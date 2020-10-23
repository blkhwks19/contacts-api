const uuid = require('node-uuid')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Contact', {
    id: { type: DataTypes.UUID, defaultValue: uuid.v4, primaryKey: true },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
  });
}
