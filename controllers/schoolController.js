const { json } = require('express');
const { insertSchool, getSchoolsSortedByProximity } = require('../models/schoolModel');

//add school 
const addSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: "All fields are required." });
    }
    
    

    insertSchool(name, address, parseFloat(latitude), parseFloat(longitude), (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to add school." });
        }
        res.status(201).json({ message: "School added succesfully." });
    });
};

//retrieve schools
const listSchools = (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and Longitude are required.' });
    }

    getSchoolsSortedByProximity(parseFloat(latitude), parseFloat(longitude), (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve schools.' });
        }
        res.json(results);
    });
};

module.exports = { addSchool, listSchools };