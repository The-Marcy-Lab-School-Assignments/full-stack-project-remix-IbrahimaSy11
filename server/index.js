require('dotenv').config();
const path = require('path');
const express = require('express');
const cookieSession = require('cookie-session');

const logRoutes = require('./middleware/logRoutes');
const checkAuthentication = require('./middleware/checkAuthentication');
const authControllers = require('./controllers/authControllers');
// REMIX: replaced todoControllers with medicationControllers
const medicationControllers = require('./controllers/medicationControllers');

const app = express();
const PORT = process.env.PORT || 8080;

// ====================================
// Middleware
// ====================================

// unchanged — same middleware stack as the case study
app.use(logRoutes);
app.use(cookieSession({ name: 'session', secret: process.env.SESSION_SECRET }));
app.use(express.json());

// In production, serve the built React app from frontend/dist.
// In development, Vite's dev server handles the frontend on a separate port
// and proxies /api requests to this server.
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// ====================================
// Auth routes
// ====================================

// unchanged — auth endpoints are the same as the case study
app.post('/api/auth/register', authControllers.register);
app.post('/api/auth/login', authControllers.login);
app.get('/api/auth/me', authControllers.getMe);
app.delete('/api/auth/logout', authControllers.logout);

// ====================================
// Medication routes (all require authentication)
// ====================================

// REMIX: replaced /api/todos with /api/medications
// REMIX: replaced todoControllers with medicationControllers
// REMIX: replaced todo_id with medication_id in route params
app.get('/api/medications', checkAuthentication, medicationControllers.listMedications);
app.post('/api/medications', checkAuthentication, medicationControllers.createMedication);
app.patch('/api/medications/:medication_id', checkAuthentication, medicationControllers.updateMedication);
app.delete('/api/medications/:medication_id', checkAuthentication, medicationControllers.deleteMedication);

// ====================================
// Global Error Handler
// ====================================

// unchanged — same error handler as the case study
const handleError = (err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: 'Internal Server Error' });
};
app.use(handleError);

// ====================================
// Listen
// ====================================

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));