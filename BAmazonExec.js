const mysql = require('mysql');
const dotenv = require('dotenv').config();
const inquirer = require('inquirer');
const chalk = require('chalk');
const table = require('table');
const server = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.PASSWORD,
  database: "BAmazon"
});
