const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    doctorName: { type: String, required: true },
    appointmentTime: {
        type: Date,
        required: true,
        set: (v) => {
            if (v === null || v === undefined) {
                return new Date();
            }
            const date = new Date(v.replace(/\./g, ':'));
            return isNaN(date.getTime()) ? new Date() : date;
        },
        get: (v) => v instanceof Date ? v.toISOString() : v
    },
    reason: { type: String, required: true }
});

module.exports = mongoose.model('Appointment', appointmentSchema);