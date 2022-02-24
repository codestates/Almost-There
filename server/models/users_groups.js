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
      users_groups.belongsTo(models._groups, { foreignKey: 'groupId', sourceKey: 'id', onDelete: 'cascade' });
      users_groups.belongsTo(models.users, { foreignKey: 'userId', sourceKey: 'userId', onDelete: 'cascade' });
    }
  }
  users_groups.init({
    groupId: DataTypes.INTEGER,
    userId: DataTypes.STRING,
    overtime: DataTypes.TIME
  },
  {
    sequelize,
    modelName: 'users_groups',
    tableName: 'users_groups',
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  return users_groups;
};
