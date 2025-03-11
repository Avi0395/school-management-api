const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/db");

const cors = require("cors")

const { createSchoolTable } = require('./models/schoolModel')
createSchoolTable();

dotenv.config();

const app = express();
const corsOption = {
    origin: "http://localhost:5173",
    credentials: true
};
app.use(cors(corsOption));

app.use(express.json());

const schoolRoutes = require("./routes/schoolRoutes");
app.use("/api/schools", schoolRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
