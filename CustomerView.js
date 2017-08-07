var mysql= require("mysql");

var inquirer= require("inquirer");
var Table = require('cli-table2');
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err){
	if (err) throw err;
	console.log("connection is ready"+ connection.thredId + "\n");

	displayProd();
})

function displayProd(){
  var query = connection.query("SELECT item_id, product_name, department_name, price FROM products p ", function(err,res){
     if (err) throw err;

     var table = new Table({
       head: ['ID', 'Product Name','DEP NAME','PRICE']
     , colWidths: [10, 20,20,20]
   });

   // table is an Array, so you can `push`, `unshift`, `splice` and friends
   for (var i = 0; i < res.length; i++) {
   table.push(
       [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price]

   );


 }
  console.log(table.toString());
  });

}
var newQuantity = 1;
 shopingcart();
function shopingcart (){
	inquirer.prompt([
    {
      type:"input",
      message:"Please choose the product ID that would you like to buy?",
      name:'id',
      filter: function(input){
            if(typeof input != 'number') {
                console.log("Please enter numbers only")
              } if (input >= 11) {
                console.log(" Choose a valid Item")
              }
              else{
                console.log(" Thanks For Selecting")
           }
        return input;
      }

  },
  {
    type:"input",
    message:"How Many units you want to buy?",
    name:'units',
    }

]).then(function(answers){

var query= connection.query(

    "SELECT product_name, department_name, stock_quantity, price FROM products p WHERE item_id = ? ",
    answers.id,
    function(err, res){
      // console.log(res[0])
         if (err) throw err;
         console.log(res[0].price + "  PRICE!!!");
         console.log(answers.units)
      if(answers.units > res[0].stock_quantity) {
        console.log( "Insuffucent quantity for this order")
      } else{
       console.log("products name!:"+ res[0].product_name );
       console.log(" products SELECTED! :" +answers.units);
       console.log(" Total $" +(answers.units *res[0].price));
      newQuantity = res[0].stock_quantity - answers.units;
       console.log(newQuantity );
       connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?",[newQuantity, answers.id]

       , function(err, res){
         if (err) throw err;
         // console.log(res);
         console.log("*****************************");
         console.log('Thansk for shopping with us');
          console.log("*****************************");
        })
    }

  }
      );



 });

 //end of shoppingcart
}
