require('dotenv').config();
const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require('chalk');
const {table} = require('table');
const server = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: process.env.PASSWORD,
  database: "BAmazon"
});

function openStore(){
  server.query('SELECT * FROM Products', function(err, results){
    if(err) throw err;

    console.log("==========BEN'S BAMAZON================");
    console.log("================================");

    for(let i = 0; i<results.length; i++){
      console.log("Id: " + results[i].ItemID + " | " + "Product: " + results[i].ProductName + " | " + "Department: " + results[i].DepartmentName + " | ");
      console.log("===============================");
    }
    console.log(' ');
    inquirer.prompt([
      {
      type: 'input',
      name: 'ItemID',
      message: 'What is the Id of the item you want to buy?',
      validate: function(val){
        if(isNaN(val) == false && parseInt(val) <= results.length && parseInt(val) > 0){
          return true;
        }else{
          return false;
          }
        }
      },
      {
      type: 'input',
      name: 'ItemQuantity',
      message: 'How many do you want to buy?',
      validate: function(val){
        if(isNaN(val) === false){return true;}else{return false;}
        }
      }
    ]).then(function(answer){
      let purchasedItem = (answer.ItemID)-1;
      let purchaseQuantity = parseInt(answer.ItemQuantity);
      let purchaseTotal = parseFloat(((results[purchasedItem].Price)*purchaseQuantity).toFixed(2));
      //check inventory
      if(results[purchasedItem].StockQuantity >= purchaseQuantity){
        server.query("UPDATE Products SET ? WHERE ?", [
          {StockQuantity: (results[purchasedItem].StockQuantity - purchaseQuantity)},
          {ItemID: answer.id}
        ], function(err, result){
          if(err) throw err;
          console.log("Purchase Complete. Your total is $" + purchaseTotal.toFixed(2) + ".");
        });
        server.query("SELECT * FROM Departments", function(err, deptResults){
          if(err) throw err;
          var index;
          for(let i=0; 1 < deptResults.length; i++){
            if(deptResults[i].DepartmentName == results[purchasedItem].DepartmentName){
              index = i;
            }
          }
        //update sales
        server.query("UPDATE Departments SET ? WHERE ?", [
          {TotalSales: deptResults[index].TotalSales + purchaseTotal},
          {DepartmentName: results[purchasedItem].DepartmentName}
        ], function(err, deptResults){
          if(err) throw err;
        })
        })
      }else{
        console.log("Not enough in stock to complete your purchase");
      }
      reOpen();
    });//End inquirer
  });//End server query
}//End store


//prompt for another purchase
function reOpen(){
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'restart',
      message: 'Would you like to buy another item?'
    }
  ]).then(function(answer){
    if(answer.restart){
      openStore();
    }else{
      console.log("Thanks for shopping with us! Come back soon!");
    }
  });
}//End reOpen

openStore();
