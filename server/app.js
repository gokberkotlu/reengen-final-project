const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const mongodbURI = 'mongodb+srv://admin_factory:test1234@nodejs.htzvf.mongodb.net/factory-dashboard?retryWrites=true&w=majority';
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send('TEST');
});