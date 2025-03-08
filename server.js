const express = require('express');
const db = require('./config/db');
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();
app.use(express.json());

// Initialize Table
const { createSchoolTable } = require('./models/schoolModel');
createSchoolTable();

// Routes
app.use('/api/schools', schoolRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

