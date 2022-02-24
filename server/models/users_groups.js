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
      users_groups.belongsTo(models._groups, { foreignKey: 'groupId', targetKey: 'id', onDelete: 'cascade' });
      users_groups.belongsTo(models.users, { foreignKey: 'userId', targetKey: 'userId', onDelete: 'cascade' });
    }
  }
  users_groups.init({
    groupId: DataTypes.INTEGER,
    userId: DataTypes.STRING,
    overtime: DataTypes.TIME
  },
  {
    sequelize,
    modelName: 'users_groups'
  });
  return users_groups;
};
