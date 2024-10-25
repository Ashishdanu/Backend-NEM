# Hospital

# Description

This is a backend system for a healthcare appointment booking application. It allows patients to book appointments with doctors and provides routes to manage doctors, patients, and appointments.

# Features

- Manage doctors (CRUD operations)
- Manage patients (CRUD operations)
- Book, update, and cancel appointments
- Retrieve lists of doctors, patients, and appointments

# Technologies Used

- Node.js
- Express.js
- MongoDB

# Prerequisites

- Node.js (v14 or later)
- MongoDB (v4 or later)

# Installation

1. Clone the repository:
   git clone
   cd Hospital
2. Install dependencies:
   npm install
3. Set up your MongoDB database:

4. Make sure MongoDB is running on your system
5. The default connection string is mongodb://localhost:27017/Evaluation2
6. If you need to use a different connection string, update it in app.js

7. Start the server:
   npm start

The server will start running on [http://localhost:3001](http://localhost:3001).

# API Endpoints

# Doctors

- GET /doctors: Retrieve all doctors
- POST /doctors: Create a new doctor
- PUT /doctors/:id: Update a doctor
- DELETE /doctors/:id: Delete a doctor

# Patients

- GET /patients: Retrieve all patients
- POST /patients: Create a new patient
- PUT /patients/:id: Update a patient
- DELETE /patients/:id: Delete a patient

# Appointments

- GET /appointments: Retrieve all appointments
- POST /appointments: Create a new appointment
- PUT /appointments/:id: Update an appointment
- DELETE /appointments/:id: Delete an appointment

# Usage Examples

Here are some examples of how to use the API with PowerShell in Windows:

1. Get all doctors:

Invoke-RestMethod -Uri "http://localhost:3001/doctors" -Method Get

2. Create a new patient:

$body = @{
name = "John Doe"
age = 30
email = "john@example.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/patients" -Method Post -Body $body -ContentType "application/json"

3. Book an appointment:

$body = @{
patientName = "John Doe"
doctorName = "Dr. Smith"
appointmentTime = "2024-10-25 14:00"
reason = "Follow-up"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/appointments" -Method Post -Body $body -ContentType "application/json"

4. Update an appointment:

$body = @{
patientName = "John Doe"
doctorName = "Dr. Smith"
appointmentTime = "2024-10-26 15:30"
reason = "Rescheduled follow-up"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/appointments/60a7c8b9e6b3f32b4c9b4567" -Method Put -Body $body -ContentType "application/json"

5. Delete an appointment:

Invoke-RestMethod -Uri "http://localhost:3001/appointments/60a7c8b9e6b3f32b4c9b4567" -Method Delete

Replace `60a7c8b9e6b3f32b4c9b4567` with actual appointment IDs from your database.

# Error Handling

The API uses appropriate HTTP status codes and returns error messages in JSON format. For example:

{
"error": "All fields are required"
}

# Data Validation

- All required fields are validated before processing requests
- ObjectId validation is performed for operations involving document IDs
