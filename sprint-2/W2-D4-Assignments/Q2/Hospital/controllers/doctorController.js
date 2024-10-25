const Doctor = require('../models/doctor');

exports.getAllDoctors = async (req, res) => {
    try {
        const { specialization, available, page = 1, limit = 10, search } = req.query;
        const query = {};

        if (specialization) query.specialization = specialization;
        if (available) query.availability = available === 'true';
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { specialization: { $regex: search, $options: 'i' } },
            ];
        }

        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
        };

        const doctors = await Doctor.paginate(query, options);
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctors', error: error.message });
    }
};

exports.createDoctor = async (req, res) => {
    try {
        const { name, specialization, availability } = req.body;
        const doctor = new Doctor({ name, specialization, availability });
        await doctor.save();
        res.status(201).json(doctor);
    } catch (error) {
        res.status(500).json({ message: 'Error creating doctor', error: error.message });
    }
};