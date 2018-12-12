const express = require('express');
const app = express();
const port = process.env.port || 3000;
const mysql = require('mysql');

app.use(express.static('public'));

app.listen(port, 'localhost');


const dbOptions = {
  'username': 'root',
  'password': '',
  'database': 'checkout'
}

dbConnection = mysql.createConnection(dbOptions);


