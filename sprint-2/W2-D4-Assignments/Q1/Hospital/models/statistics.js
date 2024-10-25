const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
    totalAppointments: { type: Number, default: 0 },
    doctorAppointments: [{
        doctorName: String,
        appointmentCount: Number
    }],
    patientAppointments: [{
        patientName: String,
        appointmentCount: Number
    }],
    dailyAppointments: [{
        date: Date,
        appointmentCount: Number
    }]
});

module.exports = mongoose.model('Statistics', statisticsSchema);