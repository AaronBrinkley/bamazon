var mysql = require('mysql');

var inquirer = require('inquirer');

var idChoice 

var addChoice

var currentStock


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

function askManager() {

	inquirer.prompt({
	  name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
	})

.then(answers => {

	switch (answers.action) {
        case "View Products for Sale":
          viewProducts()
          break;

        case "View Low Inventory":
          viewLowProducts()
          break;

        case "Add to Inventory":
          viewProductsAddToInvetory()
          break;

        case "Add New Product":
          addNewProduct()
          break;
      }
    
});


}

function viewProducts() {

	connection.query("SELECT * FROM products",
		function(err, res){
			if (err) throw err;
			console.log(res)
			askManager()
		
		});
}


function viewProductsAddToInvetory() {

	connection.query("SELECT * FROM products",
		function(err, res){
			if (err) throw err;
			console.log(res)
			promptIDAdd()
		
		});
}





function viewLowProducts() {


	var query = "SELECT * FROM products";
      connection.query(query,  function(err, res) {
        for (var i = 0; i < res.length; i++) {

        	if (res[i].stock_quantity < 5) {
        		console.log("We're out of ID number " + res[i].item_id)
        	// } else {
        	// 	console.log("We're well stocked with ID number " + res[i].item_id)
        	// }

        }

     }

        askManager()

    })

 }

 function promptIDAdd() {

 	// connection.query("SELECT * FROM products",
		// function(err, res){
		// 	if (err) throw err;
		// 	console.log(res)
			
		
		// });

 	inquirer.prompt({
	  name: "choice",
      type: "input",
      message: "Select Product ID",
      filter: Number
	})

.then(answers => {

	idChoice = answers.choice

	connection.query("SELECT * FROM products WHERE ?", {item_id: idChoice},
		function(err, res){
			if (err) throw err;
			currentStock = res[0].stock_quantity
			console.log(res)
			promptAddToInventory()
			//askManager()
		
		});

	
});


 }

 function promptAddToInventory() {

 	inquirer.prompt({
	  name: "number",
      type: "input",
      message: "How much would you like to add?",
      filter: Number
	})

.then(answers => {

	addChoice = answers.number

	AddtoInventory()

	// connection.query("SELECT * FROM products WHERE ?", {item_id: answers.choice},
	// 	function(err, res){
	// 		if (err) throw err;
	// 		//console.log(res)
	// 		//askManager()
		
	// 	});

	
});

}

function AddtoInventory() {

	var productNumber = currentStock + addChoice

	console.log("Adding product(s)...\n");
	connection.query(
		"UPDATE products SET ? WHERE ?",
	[
	{
		stock_quantity: productNumber
	},
	{
		item_id: idChoice
	}
	],

	function(err, res){
		//console.log(res)
		askManager()
	}

	)

}


 

 function addNewProduct() {

 	inquirer.prompt([
 	{
	  name: "proName",
      type: "input",
      message: "Product Name?"
	},
	{
	  name: "depName",
      type: "input",
      message: "Department Name?"

	},
	{
	  name: "price",
      type: "input",
      message: "Price?",
      filter: Number

	},
	{
	  name: "stock",
      type: "input",
      message: "Stock Quantity?",
      filter: Number

	}
	])

.then(answers => {

	connection.query(
		"INSERT INTO products SET ?",
	{
		product_name: answers.proName,
		department_name: answers.depName,
		price: answers.price,
		stock_quantity: answers.stock
	},

	function(err, res){
		console.log(res.affectedRows + " product inserted")
		askManager()
	}


		)



	
});

 }


askManager()