const sql = require('mysql');
const dotenv = require('dotenv').config();
const inquirer = require('inqirer');
const server = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.PASSWORD,
  database: "BAmazon"
});
