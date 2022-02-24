'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class _groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      _groups.hasMany(models.users_groups, { foreignKey: 'groupId', sourceKey: 'id', onDelete: 'cascade' });
    }
  }
  _groups.init({
    name: DataTypes.STRING,
    time: DataTypes.DATE,
    leaderId: DataTypes.STRING,
    place: DataTypes.STRING,
    lat:DataTypes.STRING,
    lng:DataTypes.STRING
  }, {
    sequelize,
  });
  return _groups;
};
