const db = require('../config/db')

//create table schools
const createSchoolTable = () => {
    const query = `CREATE TABLE IF NOT EXISTS SCHOOLS(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL
    );`
        ;

    db.query(query, (err) => {
        if (err) {
            console.error("Error creatting schools table :", err.message);
        } else {
            console.log("Schools table created succesfully or already exists...");
        }
    });
};

//insert school data
const insertSchool = (name, address, latitude, longitude, callback) => {
    const query = `INSERT INTO SCHOOLS (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
    db.query(query, [name, address, latitude, longitude], callback);
}

//fetch school data
const getSchoolsSortedByProximity = (userLat, userLng, callback) => {
    const query = `
        SELECT *, 
        (6371 * ACOS(
            COS(RADIANS(?)) * COS(RADIANS(latitude)) *
            COS(RADIANS(longitude) - RADIANS(?)) +
            SIN(RADIANS(?)) * SIN(RADIANS(latitude))
        )) AS distance
        FROM SCHOOLS
        ORDER BY distance;
    `;
    db.query(query, [userLat, userLng, userLat], callback);
};

module.exports = { createSchoolTable, insertSchool, getSchoolsSortedByProximity };