const sql = require('mysql');
const inquirer = require('inqirer');
const server = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "BAmazon"
});
