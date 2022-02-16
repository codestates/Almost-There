'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notifications_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  notifications_users.init({
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    notifyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'notifications_users'
  });
  return notifications_users;
};
