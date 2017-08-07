DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT  NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(200) NULL,
  department_name VARCHAR(200) NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity DECIMAL(10) NULL,

  PRIMARY KEY (item_id)
);


INSERT INTO products ( product_name, department_name, price, stock_quantity) VALUES ( "Winder", "Books", 10.5, 10);
INSERT INTO products ( product_name, department_name, price, stock_quantity) VALUES ( "SkinnyTest Fast and Slow", "Books", 21.39, 10);
INSERT INTO products ( product_name, department_name, price, stock_quantity) VALUES ( " Echo-Black", "Echo & Alexa", 179.99, 120);
INSERT INTO products ( product_name, department_name, price, stock_quantity) VALUES ( "Echo Dot", "Echo & Alexa", 49.99, 75);
INSERT INTO products ( product_name, department_name, price, stock_quantity) VALUES ( "Echo Show - Black", "Echo & Alexa", 29.99, 90);
INSERT INTO products ( product_name, department_name, price, stock_quantity) VALUES ( "925 Silver Necklace", "jewelry", 20, 5);
INSERT INTO products ( product_name, department_name, price, stock_quantity) VALUES ( "Mountain Ring","jewelry" , 45.00, 10);
INSERT INTO products ( product_name, department_name, price, stock_quantity) VALUES ( "Vitamin C", "Beauty", 16.5, 10);
INSERT INTO products ( product_name, department_name, price, stock_quantity) VALUES ( "Hair styling Gels", "Beauty", 18.66, 10);
INSERT INTO products ( product_name, department_name, price, stock_quantity) VALUES ( "iPhone6", "Electronics", 395.00, 10);
INSERT INTO products ( product_name, department_name, price, stock_quantity) VALUES ( "ice-cream", "fresh", 3.26, 10);


SELECT * FROM products;

CREATE TABLE departmnet (
  department_id INT  AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(200) NULL,
  department_name VARCHAR(200) NULL,
  over_head_costs DECIMAL(11,2) NOT NULL,
   PRIMARY KEY (department_id)
);



//  for superviewe 
ALTER TABLE products ADD product_sale  DECIMAL (10,4) NUll;
