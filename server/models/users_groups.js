'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  users_groups.init({
    groupId: DataTypes.STRING,
    userId: DataTypes.STRING,
    overtime: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users_groups'
  });
  return users_groups;
};
