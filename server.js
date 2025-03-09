const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/db");  
const {createSchoolTable}=require('./models/schoolModel')
createSchoolTable();
dotenv.config();

const app = express();

app.use(express.json());

const schoolRoutes = require("./routes/schoolRoutes");
app.use("/api/schools", schoolRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
