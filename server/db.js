const { Client } = require('pg');

const { HOST, USER, PORT, PASSWORD, DATABASE } = process.env;

const client = new Client({
    host: HOST,
    user: USER,
    port: PORT,
    password: PASSWORD,
    database: DATABASE,
});

client.connect();

module.exports = client;
