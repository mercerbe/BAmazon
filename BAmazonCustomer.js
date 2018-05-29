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
    
  })
}
