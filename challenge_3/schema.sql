DROP DATABASE IF EXISTS checkout;
CREATE DATABASE checkout;
USE checkout;

DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
  id INT NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  password VARCHAR(255),
  address1 VARCHAR(255) NOT NULL,
  address2 VARCHAR(255),
  city VARCHAR(255) NOT NULL,
  state VARCHAR(2) NOT NULL,
  zip VARCHAR(5) NOT NULL,
  phone VARCHAR(30),
  cc VARCHAR(25) NOT NULL,
  expiry VARCHAR(7) NOT NULL,
  cvv VARCHAR(4) NOT NULL,
  billzip VARCHAR(5) NOT NULL
);

