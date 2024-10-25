const Patient = require('../models/patient');
const Appointment = require('../models/appointment');

exports.getAllPatients = async (req, res) => {
    try {
        const { minAge, maxAge, page = 1, limit = 10 } = req.query;
        const query = {};

        if (minAge && maxAge) {
            query.age = { $gte: parseInt(minAge), $lte: parseInt(maxAge) };
        }

        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
        };

        const patients = await Patient.paginate(query, options);
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patients', error: error.message });
    }
};

exports.createPatient = async (req, res) => {
    try {
        const { name, age, email } = req.body;
        const patient = new Patient({ name, age, email });
        await patient.save();
        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ message: 'Error creating patient', error: error.message });
    }
};

exports.getPatientAppointments = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        const appointments = await Appointment.find({ patientName: patient.name }).sort({ appointmentTime: -1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patient appointments', error: error.message });
    }
};