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
      users.hasMany(models.users_groups, { foreignKey: 'userId', sourceKey: 'userId', onDelete: 'cascade' });
      // users.hasMany(models.users_groups, {foreignKey: 'x', sourceKey: 'x', onDelete:'cascade'});
      // users.hasMany(models.users_groups, {foreignKey: 'y', sourceKey: 'y', onDelete:'cascade'});
      users.hasMany(models.notifications_users, { foreignKey: 'sender', sourceKey: 'userId', onDelete: 'cascade' });
      users.hasMany(models.notifications_users, { foreignKey: 'receiver', sourceKey: 'userId', onDelete: 'cascade' });
      
    }
  }
  users.init({
    userId: {
      type: DataTypes.STRING,
      unique: true
    },
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    social: DataTypes.STRING,
    x: DataTypes.STRING,
    y: DataTypes.STRING,
    
    
  }, {
    sequelize,
    modelName: 'users'
  });

  return users;
};
