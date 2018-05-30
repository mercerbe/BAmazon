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

function openStore(){
  server.query('select * from Products', function(err, results){
    if(err) throw err;

    console.log("STORE");
    console.log("================================");

    for(let i = 0; i<results.length; i++){
      console.log("Id: " + results[i].itemID + "|" + "Product: " + results[i].ProductName + "|" + "Department: " + results[i].DeparmentName + "|");
      console.log("===============================");
    }
    console.log(' ');
    inquirer.prompt([
      {
      type: 'input',
      name: 'itemID',
      message: 'What is the Id of the item you want to buy?',
      validate: function(val){
        if(isNAN(val) == false && parseInt(val) <= results.length && parseInt(val) > 0){
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
        if(isNAN(val)){
          return false;
        }else{
          return true;
        }
      }
      }
    ]).then(function(answer){
      let purchasedItem = (answer.itemID)-1;
      let purchaseQuantity = parseInt(answer.itemQuantity);
      let purchaseTotal = parseFloat(((results[purchasedItem].Price)*purchaseQuantity).toFixed(2));
      //check inventory
      if(results[purchasedItem].StockQuantity >= purchaseQuantity){
        connection.query("UPDATE Products SET ? WHERE ?", [
          {StockQuantity: (results[purchasedItem].StockQuantity - purchaseQuantity)},
          {itemID: answer.id}
        ], function(err, result){
          if(err) throw err;
          console.log("Purchase Complete. Your total is $" + purchaseTotal + ".");
        });
        connection.query("SELECT * FROM Departments", function(err, deptResults){
          if(err) throw err;
          var index;
          for(let i=0; 1 < deptResults.length, i++){
            if(deptResults[i].DepartmentName == results[purchasedItem].DepartmentName){
              index = i;
            }
          }
        //update sales
        connection.query("UPDATE Departments SET ? WHERE ?", [
          {TotalSales: deptResults[index].TotalSales + purchaseTotal},
          {DepartmentName: results[purchasedItem].DepartmentName}
        ], function(err, deptResults){
          if(err) throw err;
        })
        })
      }else{
        console.log("Not enough in stock to complete your purchase");
      }

      reprompt();
    });//End inquirer
  });//End server query
}//End store

function reprompt(){
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'restart',
      message: 'Whould you like to buy another item?'
    }
  ]).then(function(answer){
    if(answer.reply){
      openStore();
    }else{
      console.log("Thanks for shopping with us! Come back soon!");
    }
  });
}//End reprompt

openStore();
