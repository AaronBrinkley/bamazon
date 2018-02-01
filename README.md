<h1>Bamazon</h1>

<h3>Customer Experience</h3>

<p>If user runs the bamazonCustomer.js file in Node.js, they're initially shown all products in the store inventory with the option to choose an item and the number of which they want shipped. The file then subtracts the user's quantity of choice from the bamazon MySQL database and returns the user to the product select screen.</p>

<h3>Manager Experience</h3>

<p>If user runs the bamazonManager.js file in Node.js, they're prompted with four choices: the first, which shows all bamazon products; the second, which shows all products with a stock quantity below 5; the third, which allows the user the add to the stock quantity of a chosen item; and the fourth, which adds a completely new product to bamazon. Third and fourth options dynamically effect the bamazon MySQL database. All choices return user to prompt screen after being fulfilled</p>