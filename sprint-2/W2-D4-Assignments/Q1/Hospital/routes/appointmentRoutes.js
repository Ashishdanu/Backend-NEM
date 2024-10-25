const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, appointmentController.createAppointment);
router.get('/doctor/:doctorName', appointmentController.getAppointmentsByDoctor);
router.get('/date-range', appointmentController.getAppointmentsByDateRange);
router.get('/statistics', appointmentController.getAppointmentStatistics);
router.get('/check', appointmentController.checkAppointments);


module.exports = router;