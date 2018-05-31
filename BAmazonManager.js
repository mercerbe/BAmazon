const mysql = require('mysql');
const dotenv = require('dotenv').config();
const chalk = require('chalk');
const {table} = require('table');
const inquirer = require('inquirer');
const server = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.PASSWORD,
  database: "BAmazon"
});

function managerBackend() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'backend',
      message: 'What would you like to do?'
      choices: ['View Products for Sale','View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit']
    }
  ]).then(function(answer){
    switch (answer.backend) {
      case 'View Products for Sale': viewProducts();
        break;
      case 'View Low Inventory': viewLowInventory();
        break;
      case 'Add to Inventory': addToInventory();
        break;
      case 'Add New Product': addProduct();
        break;
      case 'Exit': console.log('Session Ended.');
    }
  });
}

//view products
function viewProducts(){
  console.log('\n=====All Inventory=====\n');

  server.query('SELECT * FROM Products', function(error, results){
    if(error) throw error;
    console.log('=======================');

    for(let i=0;  i<results.length; i++){
      console.log("ID: " + results[i].ItemID + " | " + "Product: " + results[i].ProductName + " | " + "Department: " + results[i].DepartmentName + " | " + "Price: " + results[i].Price + " | " + "Quantity in Stock: " + results[i].StockQuantity);
      console.log("=====================");
    }
    managerBackend();
  });

}

//Low inventory products
function viewLowInventory() {
  console.log('\n=====Viewing Low Inventory=====\n');

  server.query('SELECT * FROM Products WHERE StockQuantity <= 10', function(error, results){
    if(error) throw error;

    for(let i=0;  i<results.length; i++){
      console.log("ID: " + results[i].ItemID + " | " + "Product: " + results[i].ProductName + " | " + "Department: " + results[i].DepartmentName + " | " + "Price: " + results[i].Price + " | " + "Quantity in Stock: " + results[i].StockQuantity);
      console.log("=====================");
    }
    managerBackend();
  });
}

//adding inventory
function addToInventory() {
  console.log('\n=====Add to Inventory=====\n');

  server.query('SELECT * FROM Products', function(error, results){
    if(error) throw error
    let items = [];
    for(let i=0; i<results.length; i++){
      items.push(results[i].ProductName)
    }

    inquirer.prompt([
      {
        type: 'list',
        name: 'product',
        message: 'Select the product you would like to add inventory to: ',
        choices: items
      },
      {
        type: 'input',
        name: 'quantity',
        message: 'How much needs to be stocked?'
        validate: function(val){
          if(isNAN(val) === false){return true;}else{return false;}
        }
      }
    ]).then(function(answer){
      var currentQuantity;
      for(let i=0; i<results.length; i++){
        if(results[i].ProductName === answer.product){
          currentQuantity = results[i].StockQuantity;
        }
      }
      server.query('UPDATE Products SET ? WHERE ?', [{StockQuantity: currentQuantity + parseInt(answer.quantity)},{ProductName: answer.product}], function(error, results){
        if(error) throw error;
        console.log("Inventory Updated.");
        managerBackend();
      });
    })
  });
}

//adding new product
function addProduct() {
  console.log('\n=====Add New Product=====\n');
  let departmentNames = [];
  server.query('SELECT * FROM Departments', function(error, results){
    if(error) throw error;
    for(let i=0; i<results.length; i++){
      departmentNames.push(results[i].DepartmentName);
    }
  });

  inquirer.prompt([
    {
      type: 'input',
      name: 'product',
      message: 'Name of product being added: ',
      validate: function(value){
        if(value){return true;}else{return false;}
      }
    },
    {
      type: 'list',
      name: 'department',
      message: 'Name of department where product will be added: ',
      choices: departmentNames
    },
    {
      type: 'input',
      name: 'price',
      message: 'Price of new product: ',
      validate: function(input){
        if(isNAN(input) === false){return true;}else{return false;}
      }
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'Quantity of the product that will be stocked: ',
      validate: function(input){
        if(isNAN(input) === false){return true;}else{return false;}
      }
    }
  ]).then(function(answer){
    server.query('INSERT INTO Products SET ?', [{
      ProductName: answer.product,
      DepartmentName: answer.department,
      Price: answer.price,
      StockQuantity: answer.quantity
    }], function(error, results){
      if(error) throw error;
      console.log("Successfully added new product to the store.");
    })
    managerBackend();
  })
}

managerBackend();
