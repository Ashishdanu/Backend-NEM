module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      phone_number: DataTypes.STRING,
      priority: {
        type: DataTypes.INTEGER,
        defaultValue: 2
      }
    });
  
    return User;
  };
  