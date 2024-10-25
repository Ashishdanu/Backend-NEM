const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    availability: { type: Boolean, default: true },
});

doctorSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Doctor', doctorSchema);