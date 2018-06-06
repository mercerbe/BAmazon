# BAmazon

A sample command line store integrating mySQL and Node.js where customers can place orders, inventory is managed, and sales are tracked.

## Getting Started

* Clone repository
* Run 'npm install' in Terminal
* Run command for which mode you'd like to enter:
  - Customer: 'node BAmazonCustomer'
  - Manager: 'node BAmazonManager'
  - Supervisor: 'node bamazonSupervisor'

### Prerequisites

npm packages:

```
inquirer
chalk
dotenv
sql
table

```

### Functionality

Let's walk through each mode:

1. BAmazonCustomer
  * run 'node BAmazonCustomer'
  * user prompted for the ID of the item they wish to purchase
  * user prompted for the Quantity they wish to purchase
  * database item quantities are checked against quantity user is requesting. If there is enough in stock,
    the users purchase goes through, the total is calculated and the quantity is updated in the database as
    well as the sales for the department.

2. BAmazonManager
  * run 'node BAmazonManager'
  * user prompted with list of options: 'View Products for Sale','View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit'
  * 'View Products for Sale': shows full store items table from the database
  * 'View Low Inventory': shows user all products that have less than 5 in stock
  * 'Add to Inventory':
      - user prompted to select a product, then how much they would like to add to stock
      - after prompt, database is updated to show added stock
  * 'Add New Product':
      - user prompted for name, price, department name, and stock quanitity for new product
      - then database is updated to show new product in table with prompted information

3. BAmazonSupervisor
  * run 'node BAmazonSupervisor'
  * user prompted with options: "View Product Sales by Department","Create New Department", "Quit"
  * "View Product Sales by Department": displays departments table from database with sales
  * "Create New Department": prompts user for department name and overhead costs for department, then updates database

## Running Demos

##### Customer
[Customer Demo Video](https://google.com)
##### Manager
[Manager Demo Video](https://vimeo.com/273701289)
##### Supervisor
[Supervisor Demo Video](https://vimeo.com/273701281)


## Deployment

Remember to create your own database in mySQL called 'BAmazon', and have it reference BAmazon.sql

## Built With

* Atom
* [Node.js](https://nodejs.org/en/)
* [mySQL](https://www.mysql.com/)
* javaScript


## Versioning

For the versions available, see the [tags on this repository](https://github.com/mercerbe/BAmazon).

## Author

* **Ben Mercer**
[Ben_M](https://github.com/mercerbe)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
