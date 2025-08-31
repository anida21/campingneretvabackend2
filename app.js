// app.js
const express = require('express');
const cors = require('cors');
const appRoute = require('./routes/route.js');

const app = express();
app.use(express.json());
app.use(cors());

/** routes */
app.use('/api', appRoute);

// NEMA app.listen ovdje
module.exports = app;
