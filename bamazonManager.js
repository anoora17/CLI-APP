var mysql = require("mysql");
var inquirer =require("inquirer");
var Table = require('cli-table2');

var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password:"root",
  database:"bamazon"
});
connection.connect(function(err){
	if (err) throw err;
	console.log("connection is ready"+ connection.thredId + "\n");

	managerchoice();
 });

function managerchoice(){
inquirer.prompt([
  {
    type:"rawlist",
    message:" Welcome to the report module please choose which report would you like to view",
    name:"view",
    choices:["View Products for Sale", "View Low Inventory", "Add to Inventory","Add New Product"]
  }]).then(function(ans){

    if (ans.view === "View Products for Sale"){
          displayall();
       }
    else if (ans.view === "View Low Inventory"){
         inventory();
       }
   else if ( ans.view == "Add to Inventory"){
         addInventory();
       }
     if( ans.view == "Add New Product"){
       addProduct();
     }
     else {
       console.log(" Please Pick something valid from the list");
       connection.end();
     }
  });
};
function displayall(){
  var query = connection.query("SELECT * FROM products p ", function(err,res){
     if (err) throw err;
// This table is require npm cli-table2 to display data in table view
     var table = new Table({
       head: ['item_id', 'product_name','department_name','price', 'stock_quantity']
     , colWidths: [8, 20,20,10,20],
     style:{
       head:['green'],
       colAligns:['center']

     }
   });


   for (var i = 0; i < res.length; i++) {
   table.push(
       [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price,
       res[i].stock_quantity]

   );
 }
  console.log(table.toString());
  console.log(" This reports for Manger only");
  connection.end();
  });
}


  function inventory(){
    var query = connection.query("SELECT * FROM products p WHERE stock_quantity < 20 ", function(err,res){
       if (err) throw err;

       var table = new Table({
         head: ['item_id', 'product_name','department_name','price', 'stock_quantity']
       , colWidths: [8, 20,20,10,20],
            });

     // table is an Array, so you can `push`, `unshift`, `splice` and friends
     for (var i = 0; i < res.length; i++) {
     table.push(
         [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price,
         res[i].stock_quantity]

     );
   }
   console.log(" This reports for items with quantity less than 10 products");
    console.log(table.toString());

    connection.end();
    });

}

function addInventory(){

  inquirer.prompt([
    {
      type:'input',
      message:'What is the Item ID you want to add quantiy for?',
      name:'id',
      filter:function(input){
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
      type:'input',
      message:'How many quantity you want to add?',
      name:'quantity',
    }
  ]).then(function(ans){
    var item = ans.id;
    // console.log(ans)
  var query = connection.query("UPDATE products SET stock_quantity = (stock_quantity +  " + ans.quantity +") WHERE  item_id = ?",
   ans.id,function(err, res){

    if (err) throw err ;
    // console.log(res);
    console.log(res.affectedRows + " products updated!\n");
  var querySecond = connection.query("SELECT * FROM products p WHERE item_id = ? ", item ,function(er,rs){
      // console.log([rs]);

      var table = new Table({
        head: ['item_id', 'product_name','department_name','price', 'stock_quantity']
      , colWidths: [8, 20,20,10,20],
           });

    // table is an Array, so you can `push`, `unshift`, `splice` and friends

    table.push(
        [ rs[0].item_id,  rs[0].item_id, rs[0].stock_quantity, rs[0].price,
        rs[0].stock_quantity]

    );
   console.log(" Thanks for adding more items")
   console.log(table.toString());

    });
    connection.end();

      });
    });
  }
function addProduct(){
  inquirer.prompt([
    {
      name:'product_name',
      message:' Type the name of the product you want to Add',
      type:'input'
    },
    {
      name:'department_name',
      message:' Type the name of the department you want to add the item too',
      type:'input'
    },
    {
      name:'price',
      message:' Please Enter a price for the item you just added',
      type:'input'
    },
    {
      name:'stock_quantity',
      message:' How many pices you want to add to the inverntory?',
      type:'input',
      filter: function(input){
            if(typeof input != 'number') {
                console.log("Please enter numbers only")
              }
              else{
                console.log(" Thanks For adding a valid bumber")
           }
        return input;
      }
    }
  ]).then(function(response){
    console.log(response);
    var product = response.product_name;
var query= connection.query("INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?);",[       response.product_name,
  response.department_name,
   response.price,
   response.stock_quantity], function(err,data){
     if(err) throw err;
    // console.log(data)
    var querySecond = connection.query("SELECT * FROM products p WHERE product_name = ? ", product ,function(er,rs){
        // console.log([rs]);

        var table = new Table({
          head: ['item_id', 'product_name','department_name','price', 'stock_quantity']
        , colWidths: [8, 20,20,10,20],
             });

      // table is an Array, so you can `push`, `unshift`, `splice` and friends

      table.push(
          [ rs[0].item_id,  rs[0].item_id, rs[0].stock_quantity, rs[0].price,
          rs[0].stock_quantity]

      );
      console.log(" You have seccessfully added this product")
     console.log(table.toString());
    connection.end();
  });
});
});
}
