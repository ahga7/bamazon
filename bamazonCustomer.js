var sql = require("mysql");
var inquirer = require("inquirer");

var con = sql.createConnection({
	port:3306,
	host:"localhost",
	user:"root",
	password:"62ragtop",
	database:"bamazon",
});

con.connect(function(er){
	if (er) throw er;
		console.log("connected as id" + con.threadId);

		runApp();

});



	function runApp() {
			con.query("SELECT item_id, product_name, price  FROM products", function(err,res){
			 		if (err) throw err;

    				// Log all results of the SELECT statement
    				console.log(res);
    				// constructor functon used for prompts
					
					function prompts(id,quantity){
						this.itemId = itemId;
						this.quantity = quantity; 
					}

					// creates print info
					prompts.prototype.printInfo = function() {
						console.log("itemId:" + this.itmeId + "\nquantity:");
					};

					// runs inquirer and ask the user questions
					inquirer.prompt([
						{
							name: "itemId",
							message: "What is the product item id number?"
						}, {
							name: "quantity",
							message: "What is the quantity you would like to purchase?"
						}
						]).then(function(answers){
		
						})





			});
	}