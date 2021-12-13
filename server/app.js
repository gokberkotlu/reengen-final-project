const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const accountEditRoutes = require('./routes/accountEditRoutes');

require('dotenv').config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODBURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(PORT))
.catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send('TEST');
});

app.use(authRoutes);

app.use(accountEditRoutes);