'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      notifications.hasMany(models.notifications_users, { foreignKey: 'notifyId', sourceKey: 'id', onDelete: 'cascade' });
    }
  }
  notifications.init({
    notifyType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'notifications',
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  return notifications;
};
