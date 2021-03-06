DROP DATABASE IF EXISTS csvreports;
CREATE DATABASE csvreports;
USE csvreports;

DROP TABLE IF EXISTS users;
CREATE TABLE users
(
  id INT(5) NOT NULL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) DEFAULT NULL,
  salt VARCHAR(255) DEFAULT NULL,
  firstName VARCHAR(255) DEFAULT NULL,
  lastName VARCHAR(255) DEFAULT NULL
);

DROP TABLE IF EXISTS sales;
CREATE TABLE sales
(
  id INT(9) NOT NULL PRIMARY KEY,
  city VARCHAR(255) DEFAULT NULL,
  county VARCHAR(255) DEFAULT NULL,
  role VARCHAR(255) DEFAULT NULL,
  sales VARCHAR(255) DEFAULT NULL
);