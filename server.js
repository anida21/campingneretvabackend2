// app.js
const express = require('express');
const appRoute = require('./routes/route.js');
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 2000;

app.use(express.json());

app.use(cors());

/** routes */
app.use('/api', appRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
