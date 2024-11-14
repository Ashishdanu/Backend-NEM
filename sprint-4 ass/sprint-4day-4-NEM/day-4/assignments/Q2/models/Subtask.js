module.exports = (sequelize, DataTypes) => {
    const Subtask = sequelize.define('Subtask', {
      task_id: DataTypes.INTEGER,
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 0 // 0 for incomplete
      }
    });
  
    Subtask.associate = models => {
      Subtask.belongsTo(models.Task, { foreignKey: 'task_id' });
    };
  
    return Subtask;
  };
  