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
      // define association here
      models._groups.hasMany(models.users_groups, {
        foreignKey: 'groupId', sourceKey: 'id'
      });
    }
  }
  _groups.init({
    name: DataTypes.STRING,
    time: DataTypes.DATE,
    leaderId: DataTypes.STRING,
    place: DataTypes.STRING
  }, {
    sequelize,
    modelName: '_groups'
  });
  return _groups;
};
