require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');

const { userRoutes } = require('./Routes/user');
const { courseRoutes } = require('./Routes/course');
const { adminRoutes } = require('./Routes/admin');

const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL;
console.log(MONGO_URL);

const app = express();
app.use(express.json());
app.use("/user", userRoutes);
app.use("/course", courseRoutes);
app.use("/admin", adminRoutes);

async function main() {
    try {
        await mongoose.connect(MONGO_URL)

        console.log("Connected to the database");

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    } catch (e) {
        console.error("Fail to connect to the database ", e);
    }
}
main();

