const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json()); 

connectDB();

app.use('/api', userRoutes);

module.exports = app;
