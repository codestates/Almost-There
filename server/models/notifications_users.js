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
      notifications_users.belongsTo(models.users, { foreignKey: 'sender', sourceKey: 'id', onDelete: 'cascade' });
      notifications_users.belongsTo(models.users, { foreignKey: 'receiver', sourceKey: 'id', onDelete: 'cascade' });
      notifications_users.belongsTo(models.notifications, { foreignKey: 'notifyId', sourceKey: 'id', onDelete: 'cascade' });
    }
  }
  notifications_users.init({
    sender: DataTypes.INTEGER,
    receiver: DataTypes.INTEGER,
    notifyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'notifications_users'
  });
  return notifications_users;
};
