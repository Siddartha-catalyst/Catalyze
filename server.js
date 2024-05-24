require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require("./routes/workouts");
const cors = require("cors");
const CompanyForms =require("./routes/CompForm");
const FounderDet =require('./routes/FounderDet');

// express app
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// route
app.use('/api/users', workoutRoutes);

app.use('/api/CompanyForms',CompanyForms);

app.use('/api/FounderDet',FounderDet);

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to the database and listening on port', process.env.PORT);
        });
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err.message);
    });

app.get('/', (req, res) => {
    res.json({ msg: 'Welcome to the app catalyst' });
});