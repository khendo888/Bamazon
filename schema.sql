DROP DATABASE IF EXISTS Bamazon;

CREATE DATABASE Bamazon;
USE Bamazon;
CREATE TABLE products (
item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(30),
price DECIMAL(10,2),
stock_quantity INTEGER(10),
PRIMARY KEY (item_id)
);

SELECT * FROM products

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Earl Grey","Black Teas", 10.95, 50), 
("Tea Spoons", "Accessories", 4.95, 100),
("Peace", "Green Teas", 12.95, 70),
("Very Berry", "Herbal Teas", 8.95, 25),
("Tea Bags", "Accessories", 4.95, 100),
("Peach", "Green Teas", 12.95, 70),
("Thin Mint", "Herbal Teas", 8.95, 25),
("Tea Napkins", "Table Wares", 7.50, 100),
("Diffusers", "Supplies", 2.95, 200);