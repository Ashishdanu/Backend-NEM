const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
});

patientSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Patient', patientSchema);