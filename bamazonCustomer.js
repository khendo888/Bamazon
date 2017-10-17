const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table")

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "Bamazon"
});

// connect to the mysql server and sql database
// Creates the connection with the server and loads the product data upon a successful connection
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
    }
    selectAll();
});

function selectAll() {
    var query = 'SELECT * FROM products'
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        askID();
    });
};

//Ask user for the ID of the product they'd like to buy
function askID() {
    inquirer
        .prompt([{
            name: "askID",
            type: "input",
            message: "What is the item ID of the product you'd like to purchase?"
        }])
        .then(function(answer) {

            console.log("You selected item ID " + answer.askID);
            var query = 'SELECT * FROM products WHERE ?'
            connection.query(query, { item_id: answer.askID }, function(err, res) {
                if (err) throw err;
                console.table(res);
                askQuant(answer.askID);
            });


        })
}

//ask user the number of units they'd like to purchase
function askQuant(itemID) {
    inquirer
        .prompt([{
            name: "askQuant",
            type: "input",
            message: "How many units of this item would you like to purchase?"
        }])
        .then(function(answer) {
            console.log("You selected " + answer.askQuant + " units for purchase");
            var query = 'SELECT * FROM products WHERE ?'
            connection.query(query, {
                item_id: itemID,
            }, function(err, res) {
                if (err) throw err;
                console.log(res[0].stock_quantity);
                var stockQuantity = res[0].stock_quantity;
                console.log(answer.askQuant);
                var customerQuant = answer.askQuant;
                if (stockQuantity > customerQuant) {
                    console.log("The updated quantity for this item is " + parseInt(stockQuantity - customerQuant));

                    updateQuant(customerQuant, itemID, res[0].product_name);
                } else {
                    console.log("There are not enough units to satisfy your request. Please try again");
                    askQuant(itemID);

                }
            });
        });



}
 
function updateQuant(customerQuant, ID, name) {
    connection.query(
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [customerQuant, ID],
        function(err, res) {
            // Let the user know the purchase was successful, 
            console.log("\nSuccessfully purchased " + customerQuant + " " + name + "'s!");
            var query = 'SELECT * FROM products'
            connection.query(query, function(err, res) {
                if (err) throw err;
                console.table(res);
            });
        });
}