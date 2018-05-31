CREATE DATABASE BAmazon;

USE Bamazon;

CREATE TABLE Products(
    ItemID MEDIUMINT AUTO_INCREMENT NOT NULL,
    ProductName VARCHAR(100) NOT NULL,
    DepartmentName VARCHAR(50) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    StockQuantity INT(10) NOT NULL,
    primary key(ItemID)
);

select * from Products;

INSERT INTO Products(ProductName,DepartmentName,Price,StockQuantity)
VALUES
    ("ComputerGame","ENTERTAINMENT",50.00,100),
    ("ComputerGame2","ENTERTAINMENT",40.00,100),
    ("Game","ENTERTAINMENT",30.00,100),
    ("Game2","ENTERTAINMENT",20.00,100),
    ("Food","GROCERY",30.00,100),
    ("Food2","GROCERY",10.00,100),
    ("Clothing1","CLOTHING",75.00,100),
    ("Clothing2","CLOTHING",50.00,100),
    ("Fishing Rod","SPORTS & OUTDOORS",20.00,100),
    ("Movie","ENTERTAINMENT",15.00,100),
    ("Movie","ENTERTAINMENT",25.00,100);

CREATE TABLE Departments(
    DepartmentID MEDIUMINT AUTO_INCREMENT NOT NULL,
    DepartmentName VARCHAR(50) NOT NULL,
    OverHeadCosts DECIMAL(10,2) NOT NULL,
    TotalSales DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(DepartmentID));

INSERT INTO Departments(DepartmentName, OverHeadCosts, TotalSales)
VALUES
    ('ENTERTAINMENT', 50000.00, 15000.00),
    ('ELECTRONICS', 20000.00, 12000.00),
    ('HOME', 30000.00, 15000.00),
    ('BODY & HEALTH', 3000.00, 12000.00),
    ('GROCERY', 1200.00, 15000.00),
    ('KIDS', 40000.00, 12000.00),
    ('CLOTHING', 35000.00, 15000.00),
    ('SPORTS & OUTDOORS', 12000.00, 12000.00);
