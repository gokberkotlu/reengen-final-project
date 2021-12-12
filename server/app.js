const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODBURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(process.env.PORT))
.catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send('TEST');
});