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
      notifications_users.belongsTo(models.users, { foreignKey: 'sender', targetKey: 'userId', onDelete: 'cascade' });
      notifications_users.belongsTo(models.users, { foreignKey: 'receiver', targetKey: 'userId', onDelete: 'cascade' });
      notifications_users.belongsTo(models.notifications, { foreignKey: 'notifyId', targetKey: 'id', onDelete: 'cascade' });
    }
  }
  notifications_users.init({
    sender: DataTypes.STRING,
    receiver: DataTypes.STRING,
    notifyId: DataTypes.INTEGER
  }, {
    sequelize,
  });
  return notifications_users;
};
