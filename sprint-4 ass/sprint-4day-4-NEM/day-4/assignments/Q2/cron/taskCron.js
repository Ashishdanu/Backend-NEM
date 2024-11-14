const cron = require('node-cron');
const { Task } = require('../models');
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Cron job to update task priorities every midnight
cron.schedule('0 0 * * *', async () => {
  const tasks = await Task.findAll();
  for (let task of tasks) {
    const daysLeft = (new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24);
    let priority = 2;
    if (daysLeft <= 0) priority = 0;
    else if (daysLeft <= 2) priority = 1;
    await Task.update({ priority }, { where: { id: task.id } });
  }
});

cron.schedule('*/5 * * * *', async () => {
});
