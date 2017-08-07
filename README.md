##  Bamazon CLI-App


In this activity, you'll be creating an Amazon-like storefront with the MySQL skills you learned this week. The app will take in orders from customers and deplete stock from the store's inventory. As a bonus task, you can program your app to track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.
Make sure you save and require the MySQL and Inquirer npm packages in your homework files--your app will need them for data input and storage.

## Code Example

				  var mysql = require('mysql');
					var prompt = require('prompt');
					var colors = require('colors/safe');
					var Table = require('cli-table');
					var connection = mysql.createConnection({
						host: 'localhost',
						user: 'root',


## Installation
npm packages:
 - [mysql](https://github.com/felixge/node-mysql)
 - [inquirer](https://github.com/sboudrias/inquirer-npm-name)
 - [cli-table2](https://github.com/jamestalmage/cli-table2)


## Results:

- [Customer View](https://youtu.be/43Sz7VTDT4g)
- [ManagerView](https://youtu.be/w3aPxC0BiSk)


##### LICENSE
****##
(The MIT License)

Copyright (c) 2017 GW Coding Camp - Noora Taweel
