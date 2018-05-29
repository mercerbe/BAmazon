const sql = require('mysql');
const inquirer = require('inqirer');
const server = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "BAmazon"
});

function storeItems(){
  server.query('select * from Products', function(err, results){
    if(err) throw err;

    console.log("STORE");
    console.log("================================");

    for(let i = 0; i<results.length; i++){
      console.log("Id: " + results[i].ItemId + "|" + "Product: " + results[i].ProductName + "|" + "Department: " + results[i].DeparmentName + "|");
      console.log("===============================");
    }
    console.log(' ');
    inquirer.prompt([
      {

      }
    ]);//End inquirer

  })
}//End store
