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
connection.connect(function(err) {
  if (err) throw err;
  	console.log("Connection granted.");
    selectAll();  
  })	
  	function selectAll() {
    connection.query('SELECT * FROM bamazon.products', function(err, res) {
    if (err) throw err;
     console.table(res);
     askID();
  });
};


//Ask user for the ID of the product they'd like to buy
function askID() {
  inquirer
    .prompt({
        name: "askID",
        type: "input",
        message: "What is the item ID of the product you'd like to purchase?"
        
    })

}

/* function askQuant() {
  inquirer
    .prompt({
        name: "askQuant",
        type: "input",
        message: "How many units of this item would you like to purchase?"
        
    })
}
askQuant();

//The app should then prompt users with two messages.

//The first should ask them the ID of the product they would like to buy.
//The second message should ask how many units of the product they would like to buy.
/*Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
However, if your store does have enough of the product, you should fulfill the customer's order.

This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase.*/


//   // run the start function after the connection is made to prompt the user
//   start();
//}

// // function which prompts the user for what action they should take
// function start() {
//   inquirer
//     .prompt({
//       name: "searchId",
//       type: "rawlist",
//       message: "What is the item ID of the product you'd like to buy?",
//       choices: ["POST", "BID"]
//     })
//     .then(function(answer) {
//       // based on their answer, either call the bid or the post functions
//       if (answer.postOrBid.toUpperCase() === "POST") {
//         postAuction();
//       }
//       else {
//         bidAuction();
//       }
//     });
// }
// Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

// The app should then prompt users with two messages.

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.