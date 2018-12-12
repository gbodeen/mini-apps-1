const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.use('/client', express.static(__dirname + '/client'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, 'localhost');




