module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      dueDate: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM('TODO', 'IN_PROGRESS', 'DONE'),
        defaultValue: 'TODO'
      },
      priority: {
        type: DataTypes.INTEGER,
        defaultValue: 2 
      }
    });
  
    Task.associate = models => {
      Task.hasMany(models.Subtask, { foreignKey: 'task_id' });
    };
  
    return Task;
  };
  