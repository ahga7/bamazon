var inquirer = require('inquirer');
var mysql = require('mysql');

// MySQL connection 
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '62ragtop',
	database: 'Bamazon'
});

function promptManagerAction() {

	// manager prompt
	inquirer.prompt([
		{
			type: 'list',
			name: 'option',
			message: 'select an option:',
			choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
			filter: function (val) {
				if (val === 'View Products for Sale') {
					return 'sale';
				} else if (val === 'View Low Inventory') {
					return 'lowInventory';
				} else if (val === 'Add to Inventory') {
					return 'addInventory';
				} else if (val === 'Add New Product') {
					return 'newProduct';
				} else {
					console.log('error');
					
				}
			}
		}
	]).then(function(input) {
		
		if (input.option ==='sale') {
			displayInventory();
		} else if (input.option === 'lowInventory') {
			displayLowInventory();
		} else if (input.option === 'addInventory') {
			addInventory();
		} else if (input.option === 'newProduct') {
			createNewProduct();
		} else {
			
			console.log('error');
			
		}
	})
}

// displayInventory will display inventory
function displayInventory() {
	

	//query 
	query = 'SELECT * FROM products';

	// Make the db query
	connection.query(query, function(err, data) {
		if (err) throw err;

		console.log('Inventory: ');
		

		var invt = '';
		for (var i = 0; i < data.length; i++) {
			invt = '';
			invt += 'Item ID: ' + data[i].item_id + '   ';
			invt += 'Product Name: ' + data[i].product_name + '   ';
			invt += 'Department: ' + data[i].department_name + '   ';
			invt += 'Price: $' + data[i].price + '   ';
			invt += 'Quantity: ' + data[i].stock_quantity + '\n';

			console.log(invt);
		}
	 
		connection.end();
	})
}


function displayLowInventory() {

	//db query 
	query = 'SELECT * FROM products WHERE stock_quantity < 100';


	connection.query(query, function(err, data) {
		if (err) throw err;

	
		var invt = '';
		for (var i = 0; i < data.length; i++) {
			invt = '';
			invt += 'Item ID: ' + data[i].item_id + '  ';
			invt += 'Product Name: ' + data[i].product_name + '  ';
			invt += 'Department: ' + data[i].department_name + '  ';
			invt += 'Price: $' + data[i].price + '   ';
			invt += 'Quantity: ' + data[i].stock_quantity + '\n';

			console.log(invt);
		}

	  
		connection.end();
	})
}




function addInventory() {

	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'enter Item ID ',
			validate: validateInteger,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many would you like to add?',
			validate: validateInteger,
			filter: Number
		}
	]).then(function(input) {

		var item = input.item_id;
		var addQuantity = input.quantity;

		// Query db to confirm that the given item ID exists and to determine the current stock_count
		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err;


			
			
			
		})
	})
}


function runBamazon() {

	promptManagerAction();
}

// Run app 
runBamazon();
