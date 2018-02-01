var mysql = require('mysql');

var inquirer = require('inquirer');

var infoCus = require("./info.js")

var infoWordCus = infoCus.wordThing

var customerChoiceID

var customerChoiceQuantity

var connection = mysql.createConnection(
	{
		host: "localhost",
		port: 3306,
		//username
		user: "root",
		//yourpassword
		password: infoWordCus,
		database: "bamazon"
	}
)



function bamazonInit() {
	connection.query("SELECT * FROM products",
		function(err, res){
			if (err) throw err;
			console.log(res)
			askUser()
		});
	

	
}


function withDrawProduct(productNumber) {

	console.log("Withdrawing product(s)...\n");
	var query = connection.query(
		"UPDATE products SET ? WHERE ?",
	[
	{
		stock_quantity: productNumber
	},
	{
		item_id: customerChoiceID
	}

	]


		)

}

//readProducts()

function askUser() {

	//readProducts()

	inquirer.prompt([
	{
	type: "input",
    message: "Choose product ID",
    name: "id",
    filter: Number
	},
	{
	type: "input",
    message: "How many units do you want to buy?",
    name: "quantity",
    filter: Number
	}

	])

.then(answers => {

    customerChoiceID = answers.id

    customerChoiceQuantity = answers.quantity

    var productQuery = 'SELECT * FROM products WHERE ?';

		connection.query(productQuery, {item_id: customerChoiceID}, function(err, data) {
			

			var productStock = data[0].stock_quantity

			if (productStock > 0) {

			 var shipResult = productStock - customerChoiceQuantity

			 withDrawProduct(shipResult)

			 console.log(customerChoiceQuantity + " products shipped")

			 	//console.log(data[0])

			} else {
				console.log("Insufficient quantity!")
			}
			bamazonInit()
		})
		//bamazonInit()
	})
	//bamazonInit()
}

bamazonInit()






