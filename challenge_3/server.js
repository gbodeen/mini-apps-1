const express = require('express');
const app = express();
const port = process.env.port || 3000;
const mysql = require('mysql');



app.use(express.static('public'));

app.post('/order', express.json(), (req, res) => {
  res.sendStatus(201);
  insertOrder(req.body);
})

app.listen(port, 'localhost');



const dbOptions = {
  'user': 'root',
  'password': '',
  'database': 'checkout'
}

dbConnect = mysql.createConnection(dbOptions);

const openDB = () => {
  dbConnect.connect(err => {
    if (err) {
      console.log('DB connection failed!', err);
    } else {
      console.log('Connected to DB.');
    }
  });
}

openDB();

const insertOrder = ({ name, email, password, address1, address2, city, state, zip, phone, cc, expiry, cvv, billzip }) => {
  const insertion = `INSERT INTO orders (name, email, password, address1, address2, city, state, 
    zip, phone, cc, expiry, cvv, billzip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

  dbConnect.query(insertion,
    [name, email, password, address1, address2, city, state, zip, phone, cc, expiry, cvv, billzip],
    (err, result) => {
      if (err) {
        console.log('DB insertion failed!', err.sqlMessage);
      } else {
        console.log('Insertion results: ', result);
      }
    }
  );
}

const closeDB = () => {
  dbConnect.end();
}


