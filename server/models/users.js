'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      users.hasOne(models.users_groups, { foreignKey: "userId", sourceKey: "id", onDelete: 'cascade'})
      // define association here
    }
  }
  users.init({
    userId: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    social: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users'
  });
  return users;
};
