const mongoose = require('mongoose');
const Appointment = require('../models/appointment');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const Statistics = require('../models/statistics');

// Helper function to parse dates
const parseDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
};

exports.createAppointment = async (req, res) => {
    try {
        const { patientName, doctorName, appointmentTime, reason } = req.body;

        if (!patientName || !doctorName || !appointmentTime || !reason) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const doctor = await Doctor.findOne({ name: doctorName });
        const patient = await Patient.findOne({ name: patientName });

        if (!doctor || !patient) {
            return res.status(400).json({ message: 'Doctor or patient not found' });
        }

        const parsedAppointmentTime = parseDate(appointmentTime);
        if (!parsedAppointmentTime) {
            return res.status(400).json({ message: 'Invalid appointment time format' });
        }

        const appointment = new Appointment({
            patientName,
            doctorName,
            appointmentTime: parsedAppointmentTime,
            reason,
        });

        await appointment.save();

        await Statistics.findOneAndUpdate(
            {},
            {
                $inc: { totalAppointments: 1 },
                $push: {
                    doctorAppointments: {
                        $each: [{ doctorName, appointmentCount: 1 }],
                        $position: 0
                    },
                    patientAppointments: {
                        $each: [{ patientName, appointmentCount: 1 }],
                        $position: 0
                    },
                    dailyAppointments: {
                        $each: [{ date: parsedAppointmentTime.toDateString(), appointmentCount: 1 }],
                        $position: 0
                    }
                }
            },
            { upsert: true, new: true }
        );

        res.status(201).json(appointment);
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ message: 'Error creating appointment', error: error.message });
    }
};

exports.getAppointmentsByDoctor = async (req, res) => {
    try {
        const { doctorName } = req.params;
        if (!doctorName) {
            return res.status(400).json({ message: 'Doctor name is required' });
        }

        const appointments = await Appointment.find({ doctorName }).sort({ appointmentTime: 1 });
        res.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments by doctor:', error);
        res.status(500).json({ message: 'Error fetching appointments', error: error.message });
    }
};

exports.getAppointmentsByDateRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Both start date and end date are required' });
        }

        const start = parseDate(startDate);
        const end = parseDate(endDate);

        if (!start || !end) {
            return res.status(400).json({ message: 'Invalid date format' });
        }

        console.log('Parsed dates:', { start, end });

        const appointments = await Appointment.find({
            appointmentTime: { $gte: start, $lte: end }
        }).sort({ appointmentTime: 1 });

        res.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments by date range:', error);
        res.status(500).json({ message: 'Error fetching appointments', error: error.message });
    }
};

exports.getAppointmentStatistics = async (req, res) => {
    try {
        let stats = await Statistics.findOne();
        if (!stats) {
            stats = new Statistics({
                totalAppointments: 0,
                doctorAppointments: [],
                patientAppointments: [],
                dailyAppointments: []
            });
            await stats.save();
        }

        const mostActiveDoctor = stats.doctorAppointments.reduce((max, doctor) =>
            max.appointmentCount > doctor.appointmentCount ? max : doctor
            , { appointmentCount: 0 });

        const mostFrequentPatient = stats.patientAppointments.reduce((max, patient) =>
            max.appointmentCount > patient.appointmentCount ? max : patient
            , { appointmentCount: 0 });

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const recentDailyAppointments = stats.dailyAppointments.filter(day =>
            new Date(day.date) >= thirtyDaysAgo
        );

        const averageAppointmentsPerDay = recentDailyAppointments.length > 0
            ? recentDailyAppointments.reduce((sum, day) => sum + day.appointmentCount, 0) / recentDailyAppointments.length
            : 0;

        res.json({
            totalAppointments: stats.totalAppointments,
            mostActiveDoctor,
            mostFrequentPatient,
            averageAppointmentsPerDay,
        });
    } catch (error) {
        console.error('Error fetching appointment statistics:', error);
        res.status(500).json({ message: 'Error fetching appointment statistics', error: error.message });
    }
};

exports.getPatientAppointments = async (req, res) => {
    try {
        const { patientId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(patientId)) {
            return res.status(400).json({ message: 'Invalid patient ID format' });
        }

        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        const appointments = await Appointment.find({ patientName: patient.name }).sort({ appointmentTime: -1 });
        res.json(appointments);
    } catch (error) {
        console.error('Error fetching patient appointments:', error);
        res.status(500).json({ message: 'Error fetching patient appointments', error: error.message });
    }
};

exports.updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { patientName, doctorName, appointmentTime, reason } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Appointment ID is required' });
        }

        const parsedAppointmentTime = parseDate(appointmentTime);
        if (!parsedAppointmentTime) {
            return res.status(400).json({ message: 'Invalid appointment time format' });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            { patientName, doctorName, appointmentTime: parsedAppointmentTime, reason },
            { new: true, runValidators: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.json(updatedAppointment);
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({ message: 'Error updating appointment', error: error.message });
    }
};

exports.deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Appointment ID is required' });
        }

        const deletedAppointment = await Appointment.findByIdAndDelete(id);

        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        await Statistics.findOneAndUpdate(
            {},
            {
                $inc: { totalAppointments: -1 },
                $inc: { 'doctorAppointments.$[doctor].appointmentCount': -1 },
                $inc: { 'patientAppointments.$[patient].appointmentCount': -1 },
                $inc: { 'dailyAppointments.$[day].appointmentCount': -1 }
            },
            {
                arrayFilters: [
                    { 'doctor.doctorName': deletedAppointment.doctorName },
                    { 'patient.patientName': deletedAppointment.patientName },
                    { 'day.date': deletedAppointment.appointmentTime.toDateString() }
                ]
            }
        );

        res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ message: 'Error deleting appointment', error: error.message });
    }
};

exports.checkAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().limit(5);
        res.json(appointments);
    } catch (error) {
        console.error('Error checking appointments:', error);
        res.status(500).json({ message: 'Error checking appointments', error: error.message });
    }
};