const express = require('express');
const app = express();

const { userRoutes } = require('./Routes/user');
const { courseRoutes } = require('./Routes/course');
const { adminRoutes } = require('./Routes/admin');
app.use(express.json());

app.use("/user", userRoutes);
app.use("/course", courseRoutes);
app.use("/admin", adminRoutes);

app.listen(3000);