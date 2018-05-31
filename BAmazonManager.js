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
      case 'View Low Inventory': viewInventory();
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

}
