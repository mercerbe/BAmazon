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

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

For the versions available, see the [tags on this repository](https://github.com/mercerbe/BAmazon).

## Author

* **Ben Mercer**
[Ben_M](https://github.com/mercerbe)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


### Challenge #2: Manager View (Next Level)

* Create a new Node application called `bamazonManager.js`. Running this application will:

  * List a set of menu options:

    * View Products for Sale

    * View Low Inventory

    * Add to Inventory

    * Add New Product

  * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

- - -

* If you finished Challenge #2 and put in all the hours you were willing to spend on this activity, then rest easy! Otherwise continue to the next and final challenge.

- - -

### Challenge #3: Supervisor View (Final Level)

1. Create a new MySQL table called `departments`. Your table should include the following columns:

   * department_id

   * department_name

   * over_head_costs (A dummy number you set for each department)

2. Modify the products table so that there's a product_sales column and modify the `bamazonCustomer.js` app so that this value is updated with each individual products total revenue from each sale.

3. Modify your `bamazonCustomer.js` app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

   * Make sure your app still updates the inventory listed in the `products` column.

4. Create another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:

   * View Product Sales by Department

   * Create New Department

5. When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

| department_id | department_name | over_head_costs | product_sales | total_profit |
| ------------- | --------------- | --------------- | ------------- | ------------ |
| 01            | Electronics     | 10000           | 20000         | 10000        |
| 02            | Clothing        | 60000           | 100000        | 40000        |

6. The `total_profit` column should be calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` should not be stored in any database. You should use a custom alias.

7. If you can't get the table to display properly after a few hours, then feel free to go back and just add `total_profit` to the `departments` table.

   * Hint: You may need to look into aliases in MySQL.

   * Hint: You may need to look into GROUP BYs.

   * Hint: You may need to look into JOINS.

   * **HINT**: There may be an NPM package that can log the table to the console. What's is it? Good question :)
