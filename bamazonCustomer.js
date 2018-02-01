var mysql = require('mysql');

var inquirer = require('inquirer');

var customerChoiceID

var customerChoiceQuantity

var connection = mysql.createConnection(
	{
		host: "localhost",
		port: 3306,
		//username
		user: "root",
		//yourpassword
		password: "Samandi19",
		database: "bamazon"
	}
)

// connection.connect(function(err) {
// 	if (err) throw err;
// 	console.log("connected as id" + connection.threadId)
	
// 	readProducts()
// 	askCustomer()
// 	//askID()

// })

// function bamazonInit() {

// 	//askUser()
// 	readProducts()
	
// }

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
			//if (err) throw err;

			//console.log(customerChoiceQuantity)

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
//askUser()

   // connection.connect(function(err) {
  	//if (err) throw err;
 	 //var sql = "UPDATE products SET stock_quantity = " + answers.quantity + " WHERE item_id = " + answers.id;
  // 	connection.query(sql, function (err, result) {
  //   //if (err) throw err;
  //   console.log(result.affectedRows + " record(s) updated");
  // });
//});

	//withDrawProducts()

// 	var query = "UPDATE products SET ? WHERE ?";
//       connection.query(query, [{ stock_quantity: 55 }, { item_id: 3}], function(err, res) {

//       	console.log(res.affectedRows + " product shipped")

	

// 	// if (stock_quantity[customerChoiceID] > 0) {
// 	// 	withDrawProducts()

// 	// } else {
// 	// 	console.log("Insufficient quantity!")
// 	// }
	
    
// });



// function askQuantity(){

// 	inquirer.prompt([
// 	{
	
// 	}
// 	])

// .then(answers => {

// 	if (--- > 0) {

// 	} else {
// 		console.log("Insufficient quantity!")
// 	}
    
// });

// }





