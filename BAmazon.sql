DROP DATABASE IF EXISTS BAmazon;

CREATE DATABASE BAmazon;

USE BAmazon;

CREATE TABLE Products(
    ItemID INT AUTO_INCREMENT NOT NULL,
    ProductName VARCHAR(100) NOT NULL,
    DepartmentName VARCHAR(50) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    StockQuantity INT(10) NOT NULL,
    PRIMARY KEY(ItemID)
);

select * from Products;

INSERT INTO Products(ProductName,DepartmentName,Price,StockQuantity)
VALUES
    ("ComputerPart1","ELECTRONICS",50.00,100),
    ("ComputerPart2","ELECTRONICS",40.00,100),
    ("Game1","ENTERTAINMENT",30.00,100),
    ("Game2","ENTERTAINMENT",20.00,100),
    ("Home1","HOME",45.00,20),
    ("Home2","HOME",30.00,25),
    ("Toy1","KIDS",25.00,50),
    ("Toy2","KIDS",30.00,100),
    ("Food","GROCERY",30.00,100),
    ("Food2","GROCERY",10.00,100),
    ("Clothing1","CLOTHING",75.00,100),
    ("Clothing2","CLOTHING",50.00,100),
    ("Sports1","SPORTS & OUTDOORS",20.00,100),
    ("Sports2","SPORTS & OUTDOORS",20.00,100),
    ("Movie","ENTERTAINMENT",15.00,100),
    ("Movie","ENTERTAINMENT",25.00,100);

CREATE TABLE Departments(
    DepartmentID INT AUTO_INCREMENT NOT NULL,
    DepartmentName VARCHAR(50) NOT NULL,
    OverHeadCosts DECIMAL(10,2) NOT NULL,
    TotalSales DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(DepartmentID)
);

INSERT INTO Departments(DepartmentName, OverheadCosts, TotalSales)
VALUES
    ('ENTERTAINMENT', 50000.00, 15000.00),
    ('ELECTRONICS', 20000.00, 10000.00),
    ('HOME', 30000.00, 15000.00),
    ('GROCERY', 1200.00, 15000.00),
    ('KIDS', 40000.00, 12000.00),
    ('CLOTHING', 35000.00, 15000.00),
    ('SPORTS & OUTDOORS', 12000.00, 12000.00);

grant all privileges on *.* to 'root'@'localhost'
