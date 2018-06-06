require('dotenv').config();
const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require('chalk');
const {table,getBorderCharacters} = require('table');
const server = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: process.env.PASSWORD,
  database: "BAmazon"
});

function supervisorMenu(){
  inquirer.prompt([
    {
      type: 'list',
      name: 'superMenu',
      message: 'What would you like to do?',
      choices: ["View Product Sales by Department","Create New Department", "Quit"]
    }
  ]).then(function(answer){
    switch (answer.superMenu) {
      case "View Product Sales by Department": viewDeptSales();
      break;
      case "Create New Department": newDept();
      break;
      case "Quit": console.log("Session Ended.")
                    server.end();
    }
  });
}

//Department Sales
function viewDeptSales(){
  server.query('SELECT * FROM Departments', function(error, results){
    if(error) throw error;
    console.log('\n=====Sales by Department=====\n');

    //replace with table...
    for(let i = 0; i<results.length; i++){
      console.log("Department ID: " + results[i].DepartmentID + " | " + "Department Name: " + results[i].DepartmentName + " | " + "Over Head Cost: " + (results[i].OverheadCosts).toFixed(2) +
      " | " + "Product Sales: " + (results[i].TotalSales).toFixed(2) + " | " + "Total Profit: " + (results[i].TotalSales - results[i].OverheadCosts).toFixed(2));
    }

    supervisorMenu();

  })
}

//create a new Department
function newDept(){
  console.log('\n=====Create New Department=====\n');

  inquirer.prompt([
    {
      type: 'input',
      name: 'deptName',
      message: 'Name of new Department: ',
      validate: function(input){
        if(input){return true;}else{return false;}
      }
    },
    {
      type: 'input',
      name: 'overheadCost',
      message: 'What is the overhead cost of this new department?',
      validate: function(input){
        if(isNaN(input) === false){return true;}else{return false;}
      }
    }
  ]).then(function(answer){
    server.query('INSERT INTO Departments SET ?',[{DepartmentName: answer.deptName, OverheadCosts: answer.overheadCost,}], function(error, response){
      if(error) throw error;
      console.log("New department successfully added.");
      supervisorMenu();
    });
  })
}

supervisorMenu();

//table
function showTable(result){
let config = {
      border: getBorderCharacters(`norc`)
  };
let data = [];

data.push(Object.keys(result[0]));
for (product of result) {
  data.push(Object.values(product));
}

console.log(table(data,config));

};
